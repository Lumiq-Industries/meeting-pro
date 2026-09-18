import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GlassBackground } from '../components/GlassBackground';
import { SearchBar } from '../components/SearchBar';
import { TranscriptCard } from '../components/TranscriptCard';
import { ScreenHeader } from '../components/ScreenHeader';
import { useTheme } from '../contexts/ThemeContext';
import { COLORS, FONT, RADIUS, BRAND } from '../constants/theme';
import { LAYOUT } from '../constants/layout';
import { useTranscripts } from '../data/transcriptSource';
import { MainTabParamList, RootStackParamList } from '../types';

type ArchiveNav = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Archive'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type Props = { navigation: ArchiveNav };

const FILTERS = ['All', 'WhatsApp', 'Meetings', 'Live', 'Tagged'] as const;

export function ArchiveScreen({ navigation }: Props) {
  const { effectiveTheme } = useTheme();
  const palette = COLORS[effectiveTheme];
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');
  const { transcripts, loading, error } = useTranscripts();

  const filtered = useMemo(() => {
    let list = [...transcripts];
    if (filter === 'WhatsApp') {
      list = list.filter(
        (t) => t.source === 'whatsapp_call' || t.source === 'whatsapp_voice'
      );
    } else if (filter === 'Meetings') {
      list = list.filter((t) => t.source === 'meeting' || t.source === 'upload');
    } else if (filter === 'Live') {
      list = list.filter((t) => t.status === 'live');
    } else if (filter === 'Tagged') {
      list = list.filter((t) => t.tags.length > 0);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          t.summary?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [transcripts, query, filter]);

  return (
    <GlassBackground>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <ScreenHeader
            title="Archive"
            subtitle="Every session searchable — voice notes, calls & meetings"
          />

          <SearchBar value={query} onChangeText={setQuery} />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filters}
          >
            {FILTERS.map((f) => {
              const active = filter === f;
              return (
                <Pressable
                  key={f}
                  onPress={() => setFilter(f)}
                  style={[
                    styles.filterChip,
                    {
                      backgroundColor: active ? BRAND.accent : `${palette.textMuted}15`,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.filterText,
                      { color: active ? '#FFF' : palette.textSecondary },
                    ]}
                  >
                    {f}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <Text style={[styles.resultCount, { color: palette.textMuted }]}>
            {filtered.length} session{filtered.length !== 1 ? 's' : ''}
            {query ? ` matching "${query}"` : ''}
          </Text>

          {filtered.map((t) => (
            <TranscriptCard
              key={t.id}
              transcript={t}
              onPress={() =>
                navigation.navigate('TranscriptDetail', { transcriptId: t.id })
              }
            />
          ))}

          {filtered.length === 0 && (
            <View style={styles.empty}>
              <Text style={[styles.emptyText, { color: palette.textMuted }]}>
                {loading
                  ? 'Loading transcripts…'
                  : error
                    ? `Could not load transcripts: ${error}`
                    : 'No transcripts match your search.'}
              </Text>
            </View>
          )}

          <View style={{ height: LAYOUT.tabBarClearance }} />
        </ScrollView>
      </SafeAreaView>
    </GlassBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: {
    paddingHorizontal: LAYOUT.screenPaddingH,
    paddingTop: LAYOUT.screenPaddingTop,
  },
  filters: { gap: 8, paddingVertical: 16 },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    marginRight: 8,
  },
  filterText: { fontSize: FONT.sm, fontWeight: '600' },
  resultCount: { fontSize: FONT.sm, marginBottom: 12 },
  empty: { paddingVertical: 40, alignItems: 'center' },
  emptyText: { fontSize: FONT.base },
});
