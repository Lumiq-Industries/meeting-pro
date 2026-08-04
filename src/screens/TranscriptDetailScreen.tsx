import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GlassBackground } from '../components/GlassBackground';
import { GlassCard } from '../components/GlassCard';
import { SpeakerChip } from '../components/SpeakerChip';
import { ActionItemRow } from '../components/ActionItemRow';
import { useTheme } from '../contexts/ThemeContext';
import { COLORS, FONT, RADIUS, BRAND } from '../constants/theme';
import { getTranscriptById, getSpeakerById } from '../data/mockData';
import { RootStackParamList, ActionItem } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'TranscriptDetail'>;

export function TranscriptDetailScreen({ route, navigation }: Props) {
  const { transcriptId } = route.params;
  const transcript = getTranscriptById(transcriptId);
  const { effectiveTheme } = useTheme();
  const palette = COLORS[effectiveTheme];
  const [actionItems, setActionItems] = useState<ActionItem[]>(
    transcript?.actionItems ?? []
  );

  if (!transcript) {
    return (
      <GlassBackground>
        <SafeAreaView style={styles.safe}>
          <Text style={{ color: palette.text, padding: 20 }}>Transcript not found.</Text>
        </SafeAreaView>
      </GlassBackground>
    );
  }

  const toggleAction = (id: string) => {
    setActionItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const date = new Date(transcript.date).toLocaleDateString('en-ZA', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <GlassBackground>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.topBar}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
            <Ionicons name="arrow-back" size={24} color={palette.text} />
          </Pressable>
          <View style={styles.topActions}>
            <Pressable style={styles.iconBtn}>
              <Ionicons name="share-outline" size={22} color={palette.text} />
            </Pressable>
            <Pressable style={styles.iconBtn}>
              <Ionicons name="logo-whatsapp" size={22} color={BRAND.whatsapp} />
            </Pressable>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Text style={[styles.title, { color: palette.text }]}>{transcript.title}</Text>
          <Text style={[styles.meta, { color: palette.textMuted }]}>
            {date} · {transcript.duration}
          </Text>

          <View style={styles.tags}>
            {transcript.tags.map((tag) => (
              <View key={tag} style={[styles.tag, { backgroundColor: `${BRAND.accent}18` }]}>
                <Text style={[styles.tagText, { color: BRAND.accent }]}>#{tag}</Text>
              </View>
            ))}
          </View>

          {transcript.summary && (
            <>
              <Text style={[styles.sectionTitle, { color: palette.text }]}>
                AI Summary
              </Text>
              <GlassCard style={styles.block}>
                <View style={styles.aiHeader}>
                  <Ionicons name="bulb" size={18} color={BRAND.gold} />
                  <Text style={[styles.aiLabel, { color: BRAND.gold }]}>Meeting Pro AI</Text>
                </View>
                <Text style={[styles.summaryText, { color: palette.textSecondary }]}>
                  {transcript.summary}
                </Text>
              </GlassCard>
            </>
          )}

          {actionItems.length > 0 && (
            <>
              <Text style={[styles.sectionTitle, { color: palette.text }]}>
                Action Items
              </Text>
              <GlassCard style={styles.block}>
                {actionItems.map((item) => (
                  <ActionItemRow
                    key={item.id}
                    item={item}
                    onToggle={() => toggleAction(item.id)}
                  />
                ))}
              </GlassCard>
            </>
          )}

          {transcript.segments && transcript.segments.length > 0 && (
            <>
              <Text style={[styles.sectionTitle, { color: palette.text }]}>
                Full Transcript · Speaker ID
              </Text>
              {transcript.segments.map((seg) => {
                const speaker = getSpeakerById(seg.speakerId);
                return (
                  <GlassCard key={seg.id} style={styles.segmentCard}>
                    <View style={styles.segmentHeader}>
                      {speaker && <SpeakerChip speaker={speaker} compact />}
                      <Text style={[styles.timestamp, { color: palette.textMuted }]}>
                        {seg.timestamp}
                      </Text>
                    </View>
                    <Text style={[styles.segmentText, { color: palette.text }]}>
                      {seg.text}
                    </Text>
                  </GlassCard>
                );
              })}
            </>
          )}

          <GlassCard style={[styles.block, styles.exportCard]}>
            <Ionicons name="cloud-upload-outline" size={22} color={BRAND.accent} />
            <View style={styles.exportText}>
              <Text style={[styles.exportTitle, { color: palette.text }]}>
                Export to CRM
              </Text>
              <Text style={[styles.exportDesc, { color: palette.textSecondary }]}>
                HubSpot · Salesforce · Custom webhook
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={palette.textMuted} />
          </GlassCard>

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </GlassBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  topActions: { flexDirection: 'row', gap: 8 },
  iconBtn: { padding: 8 },
  scroll: { padding: 20, paddingTop: 0 },
  title: { fontSize: FONT.xxl, fontWeight: '700', lineHeight: 32 },
  meta: { fontSize: FONT.sm, marginTop: 6 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12, marginBottom: 8 },
  tag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: RADIUS.full },
  tagText: { fontSize: FONT.sm, fontWeight: '600' },
  sectionTitle: { fontSize: FONT.lg, fontWeight: '700', marginTop: 20, marginBottom: 10 },
  block: { marginBottom: 4 },
  aiHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
  aiLabel: { fontSize: FONT.sm, fontWeight: '700' },
  summaryText: { fontSize: FONT.base, lineHeight: 24 },
  segmentCard: { marginBottom: 8 },
  segmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timestamp: { fontSize: FONT.xs, fontVariant: ['tabular-nums'] },
  segmentText: { fontSize: FONT.base, lineHeight: 22 },
  exportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginTop: 20,
  },
  exportText: { flex: 1 },
  exportTitle: { fontSize: FONT.base, fontWeight: '600' },
  exportDesc: { fontSize: FONT.sm, marginTop: 2 },
});
