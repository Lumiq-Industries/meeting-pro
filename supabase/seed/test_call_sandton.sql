-- Idempotent flagship TEST call (10 min). Not labelled demo.
-- Safe to re-run.

begin;

insert into public.tags (business_id, name, color)
values ('dbdbdbdb-0000-4000-8000-000000000001', 'test-call', '#3B82F6')
on conflict do nothing;
insert into public.tags (business_id, name, color)
values ('dbdbdbdb-0000-4000-8000-000000000001', 'handover', '#A855F7')
on conflict do nothing;

delete from public.transcript_tags
 where transcript_id = '20202020-0000-4000-8000-000000000010';
delete from public.meeting_follow_ups
 where transcript_id = '20202020-0000-4000-8000-000000000010';
delete from public.meeting_decisions
 where transcript_id = '20202020-0000-4000-8000-000000000010';
delete from public.action_items
 where transcript_id = '20202020-0000-4000-8000-000000000010';
delete from public.transcript_segments
 where transcript_id = '20202020-0000-4000-8000-000000000010';
delete from public.transcripts
 where id = '20202020-0000-4000-8000-000000000010';
delete from public.calls
 where id = '10101010-0000-4000-8000-000000000010';

insert into public.calls (
  id, business_id, whatsapp_number_id, meta_call_id, direction,
  counterparty_phone, counterparty_name, started_at, ended_at, duration_seconds,
  status, transcription_enabled, ring_state, answered_at
) values (
  '10101010-0000-4000-8000-000000000010',
  'dbdbdbdb-0000-4000-8000-000000000001',
  'dbdbdbdb-1111-4000-8000-000000000001',
  'wacid.TEST.sandton-handover',
  'user_initiated',
  '27824550112',
  'Lesedi Mokoena',
  date_trunc('minute', now() - interval '18 hours'),
  date_trunc('minute', now() - interval '18 hours') + interval '612 seconds',
  612,
  'COMPLETED',
  true,
  'ended',
  date_trunc('minute', now() - interval '18 hours') + interval '8 seconds'
);

insert into public.transcripts (
  id, business_id, call_id, meta_media_id, media_sha256, language,
  confidence, duration_seconds, full_text, status, title, summary,
  executive_summary, topics, sentiment_note, summary_model, summarized_at,
  summary_status, fetched_at
) values (
  '20202020-0000-4000-8000-000000000010',
  'dbdbdbdb-0000-4000-8000-000000000001',
  '10101010-0000-4000-8000-000000000010',
  'TEST-MEDIA-sandton-handover',
  'seeded-test-sandton-handover',
  'en',
  0.92,
  612,
  '[Business] Khaya Property Services, Thandi speaking. [Customer] Hi Thandi, it''s Lesedi Mokoena. I''m calling about unit 12B in Sandton, the handover this week. [Business] Yes, I have you on the file. Occupation is scheduled for Friday. How can I help? [Customer] The electrician still hasn''t signed off the distribution board. I don''t want to collect keys with that open. [Business] That''s fair. Sipho was on site yesterday. The board was replaced, CoC is booked for Thursday morning, nine o''clock. [Customer] Can you send me the electrician''s name and the booking confirmation? I need it for the bank. [Business] I''ll email it this afternoon, on the same thread as the occupation pack. Anything else on the punch list? [Customer] The kitchen tap still drips. They said they''d swap the cartridge. And the balcony door doesn''t latch in the wind. [Business] Cartridge is on the van for Thursday with the CoC. The latch is a strike-plate adjustment — Sipho will do that the same visit, no extra charge. [Customer] Good. Deposit — the landlord wanted two months. We agreed one and a half if I pay the first month in advance. Is that written down? [Business] Yes. Lease addendum signed last week: R22 500 deposit, first month on occupation, not two months. I''ll attach that PDF with the CoC. [Customer] And parking bay 18 is mine, not 17? The basement paint is confusing. [Business] Bay 18. I''ll have Sipho stencil your unit number on the column so the paint doesn''t throw anyone. [Customer] Fibre — Openserve said the ONT is in the cupboard but I don''t have the login. Who do I call? [Business] The building is on Openserve. I''ll send the account number and the body corporate fibre contact. Activation is usually same day once you have ID. [Customer] Keys. How many sets, and do I collect at your office or on site? [Business] Two full sets plus the mailbox. Collect on site Friday at ten, after CoC is in the file. I''ll be there with Sipho. [Customer] Can we move that to eleven? I have a bank appointment in Sandton at nine thirty. [Business] Eleven works. I''ll update the occupation diary and WhatsApp you the pin when we''re in the lobby. [Customer] Water and lights — City of Joburg. Do you transfer, or do I open a new account? [Business] You open in your name from Friday. I''ll send the meter photos from yesterday so you don''t inherit an estimate. Readings were 4491 on water, 8122 on electricity. [Customer] Noted. If the CoC fails on Thursday, do we still handover Friday? [Business] No. If it fails I will phone you Thursday before noon and we shift occupation, we don''t hand over a unit that isn''t signed off. [Customer] That''s what I needed. Last thing — pets. Small cat. The lease said no pets without consent. [Business] Landlord approved in writing, extra R1 500 on the deposit. I''ll add that to the same PDF pack this afternoon. [Customer] Please put the electrician, the meters, the addendum, the pet consent, and Friday eleven in one email so I can forward it to the bank. [Business] One email, this afternoon, copy you and the bank contact on the file. I''ll also put a one-page minutes of this call in there so nothing gets lost. [Customer] Perfect. If Sipho finds anything else on Thursday, WhatsApp me before you start extra work. [Business] Agreed. No extra work without your say-so. I''ll send the pack by four o''clock. [Customer] Thanks Thandi. See you Friday at eleven. [Business] See you then. Khaya Property Services, have a good afternoon.',
  'ready',
  'Test call — Sandton unit 12B handover',
  'Lesedi Mokoena called about occupation of unit 12B Sandton. CoC is booked Thursday 09:00; keys move to Friday 11:00 on site. Deposit is R22 500 plus R1 500 pet consent, first month on occupation. Thandi will email one pack this afternoon: electrician booking, meter readings (water 4491, electricity 8122), lease addendum, pet consent, and minutes of this call. No extra site work without Lesedi''s approval. If CoC fails, handover does not proceed.',
  'Friday 11:00 on-site handover for Sandton 12B, subject to Thursday CoC. One email pack to Lesedi and the bank this afternoon.',
  '["handover","electrical CoC","deposit","meters","pets"]'::jsonb,
  'Constructive, slightly cautious on electrical sign-off — resolved on the call.',
  'seeded-test-content',
  date_trunc('minute', now() - interval '18 hours') + interval '20 minutes',
  'ready',
  date_trunc('minute', now() - interval '18 hours') + interval '14 minutes'
);

insert into public.transcript_segments (
  business_id, transcript_id, segment_index, meta_segment_id,
  speaker, channel, start_seconds, end_seconds, text, confidence
)
select
  'dbdbdbdb-0000-4000-8000-000000000001'::uuid,
  '20202020-0000-4000-8000-000000000010'::uuid,
  (s.ord - 1)::int,
  'test-seg-' || s.ord,
  s.who,
  case when s.who = 'Business' then 0 else 1 end,
  s.t,
  s.t + 12,
  s.body,
  0.91
from (
  values
    (1,  'Business', 8,   'Khaya Property Services, Thandi speaking.'),
    (2,  'Customer', 16,  'Hi Thandi, it''s Lesedi Mokoena. I''m calling about unit 12B in Sandton, the handover this week.'),
    (3,  'Business', 32,  'Yes, I have you on the file. Occupation is scheduled for Friday. How can I help?'),
    (4,  'Customer', 44,  'The electrician still hasn''t signed off the distribution board. I don''t want to collect keys with that open.'),
    (5,  'Business', 62,  'That''s fair. Sipho was on site yesterday. The board was replaced, CoC is booked for Thursday morning, nine o''clock.'),
    (6,  'Customer', 82,  'Can you send me the electrician''s name and the booking confirmation? I need it for the bank.'),
    (7,  'Business', 96,  'I''ll email it this afternoon, on the same thread as the occupation pack. Anything else on the punch list?'),
    (8,  'Customer', 112, 'The kitchen tap still drips. They said they''d swap the cartridge. And the balcony door doesn''t latch in the wind.'),
    (9,  'Business', 132, 'Cartridge is on the van for Thursday with the CoC. The latch is a strike-plate adjustment — Sipho will do that the same visit, no extra charge.'),
    (10, 'Customer', 154, 'Good. Deposit — the landlord wanted two months. We agreed one and a half if I pay the first month in advance. Is that written down?'),
    (11, 'Business', 174, 'Yes. Lease addendum signed last week: R22 500 deposit, first month on occupation, not two months. I''ll attach that PDF with the CoC.'),
    (12, 'Customer', 196, 'And parking bay 18 is mine, not 17? The basement paint is confusing.'),
    (13, 'Business', 208, 'Bay 18. I''ll have Sipho stencil your unit number on the column so the paint doesn''t throw anyone.'),
    (14, 'Customer', 226, 'Fibre — Openserve said the ONT is in the cupboard but I don''t have the login. Who do I call?'),
    (15, 'Business', 242, 'The building is on Openserve. I''ll send the account number and the body corporate fibre contact. Activation is usually same day once you have ID.'),
    (16, 'Customer', 264, 'Keys. How many sets, and do I collect at your office or on site?'),
    (17, 'Business', 276, 'Two full sets plus the mailbox. Collect on site Friday at ten, after CoC is in the file. I''ll be there with Sipho.'),
    (18, 'Customer', 296, 'Can we move that to eleven? I have a bank appointment in Sandton at nine thirty.'),
    (19, 'Business', 310, 'Eleven works. I''ll update the occupation diary and WhatsApp you the pin when we''re in the lobby.'),
    (20, 'Customer', 326, 'Water and lights — City of Joburg. Do you transfer, or do I open a new account?'),
    (21, 'Business', 340, 'You open in your name from Friday. I''ll send the meter photos from yesterday so you don''t inherit an estimate. Readings were 4491 on water, 8122 on electricity.'),
    (22, 'Customer', 364, 'Noted. If the CoC fails on Thursday, do we still handover Friday?'),
    (23, 'Business', 376, 'No. If it fails I will phone you Thursday before noon and we shift occupation, we don''t hand over a unit that isn''t signed off.'),
    (24, 'Customer', 394, 'That''s what I needed. Last thing — pets. Small cat. The lease said no pets without consent.'),
    (25, 'Business', 410, 'Landlord approved in writing, extra R1 500 on the deposit. I''ll add that to the same PDF pack this afternoon.'),
    (26, 'Customer', 430, 'Please put the electrician, the meters, the addendum, the pet consent, and Friday eleven in one email so I can forward it to the bank.'),
    (27, 'Business', 448, 'One email, this afternoon, copy you and the bank contact on the file. I''ll also put a one-page minutes of this call in there so nothing gets lost.'),
    (28, 'Customer', 468, 'Perfect. If Sipho finds anything else on Thursday, WhatsApp me before you start extra work.'),
    (29, 'Business', 482, 'Agreed. No extra work without your say-so. I''ll send the pack by four o''clock.'),
    (30, 'Customer', 496, 'Thanks Thandi. See you Friday at eleven.'),
    (31, 'Business', 504, 'See you then. Khaya Property Services, have a good afternoon.')
) as s(ord, who, t, body);

insert into public.action_items (business_id, transcript_id, text, owner, due_date, status, is_ai_generated)
values
  ('dbdbdbdb-0000-4000-8000-000000000001','20202020-0000-4000-8000-000000000010','Email occupation pack to Lesedi and the bank contact this afternoon','Thandi', current_date, 'open', true),
  ('dbdbdbdb-0000-4000-8000-000000000001','20202020-0000-4000-8000-000000000010','Confirm CoC Thursday 09:00 and WhatsApp Lesedi if it fails before noon','Thandi', (current_date + 1), 'open', true),
  ('dbdbdbdb-0000-4000-8000-000000000001','20202020-0000-4000-8000-000000000010','Stencil unit number on parking bay 18','Sipho', (current_date + 1), 'open', true),
  ('dbdbdbdb-0000-4000-8000-000000000001','20202020-0000-4000-8000-000000000010','Meet on site Friday 11:00 with two key sets and mailbox key','Thandi', (current_date + 2), 'open', true);

insert into public.meeting_decisions (business_id, transcript_id, text, kind, is_ai_generated)
values
  ('dbdbdbdb-0000-4000-8000-000000000001','20202020-0000-4000-8000-000000000010','Occupation moves from Friday 10:00 to Friday 11:00 on site.','decision', true),
  ('dbdbdbdb-0000-4000-8000-000000000001','20202020-0000-4000-8000-000000000010','No handover if the CoC fails on Thursday.','agreement', true),
  ('dbdbdbdb-0000-4000-8000-000000000001','20202020-0000-4000-8000-000000000010','No extra work on Thursday without Lesedi''s approval.','commitment', true);

insert into public.meeting_follow_ups (business_id, transcript_id, text, owner, due_hint, status, is_ai_generated)
values
  ('dbdbdbdb-0000-4000-8000-000000000001','20202020-0000-4000-8000-000000000010','Email the occupation pack (CoC booking, meters, addendum, pet consent, minutes) by 16:00.','Thandi','Today 16:00','open', true);

insert into public.transcript_tags (transcript_id, tag_id, business_id)
select '20202020-0000-4000-8000-000000000010', id, 'dbdbdbdb-0000-4000-8000-000000000001'
  from public.tags
 where business_id = 'dbdbdbdb-0000-4000-8000-000000000001'
   and name in ('test-call', 'handover', 'rental');

commit;
