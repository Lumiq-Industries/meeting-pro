-- Idempotent TEST MODE evening voice call (~6 min 12 s at 19:57 Africa/Johannesburg).
-- Not labelled demo. Safe to re-run.

begin;

insert into public.tags (business_id, name, color)
values ('dbdbdbdb-0000-4000-8000-000000000001', 'test-call', '#3B82F6')
on conflict do nothing;
insert into public.tags (business_id, name, color)
values ('dbdbdbdb-0000-4000-8000-000000000001', 'urgent', '#EF4444')
on conflict do nothing;
insert into public.tags (business_id, name, color)
values ('dbdbdbdb-0000-4000-8000-000000000001', 'maintenance', '#3B82F6')
on conflict do nothing;

delete from public.transcript_tags
 where transcript_id = '20202020-0000-4000-8000-000000000011';
delete from public.meeting_follow_ups
 where transcript_id = '20202020-0000-4000-8000-000000000011';
delete from public.meeting_decisions
 where transcript_id = '20202020-0000-4000-8000-000000000011';
delete from public.action_items
 where transcript_id = '20202020-0000-4000-8000-000000000011';
delete from public.transcript_segments
 where transcript_id = '20202020-0000-4000-8000-000000000011';
delete from public.transcripts
 where id = '20202020-0000-4000-8000-000000000011';
delete from public.calls
 where id = '10101010-0000-4000-8000-000000000011';

-- Today 19:57 in Johannesburg, independent of the database timezone.
with start_local as (
  select (
    date_trunc('day', timezone('Africa/Johannesburg', now()))
    + interval '19 hours 57 minutes'
  ) at time zone 'Africa/Johannesburg' as started_at
)
insert into public.calls (
  id, business_id, whatsapp_number_id, meta_call_id, direction,
  counterparty_phone, counterparty_name, started_at, ended_at, duration_seconds,
  status, transcription_enabled, ring_state, answered_at
)
select
  '10101010-0000-4000-8000-000000000011',
  'dbdbdbdb-0000-4000-8000-000000000001',
  'dbdbdbdb-1111-4000-8000-000000000001',
  'wacid.TEST.evening-voice-melville',
  'user_initiated',
  '27827194057',
  'Bongani Dlamini',
  s.started_at,
  s.started_at + interval '372 seconds',
  372,
  'COMPLETED',
  true,
  'ended',
  s.started_at + interval '6 seconds'
from start_local s;

with start_local as (
  select (
    date_trunc('day', timezone('Africa/Johannesburg', now()))
    + interval '19 hours 57 minutes'
  ) at time zone 'Africa/Johannesburg' as started_at
)
insert into public.transcripts (
  id, business_id, call_id, meta_media_id, media_sha256, language,
  confidence, duration_seconds, full_text, status, title, summary,
  executive_summary, topics, sentiment_note, summary_model, summarized_at,
  summary_status, fetched_at
)
select
  '20202020-0000-4000-8000-000000000011',
  'dbdbdbdb-0000-4000-8000-000000000001',
  '10101010-0000-4000-8000-000000000011',
  'TEST-MEDIA-evening-voice-melville',
  'seeded-test-evening-voice-melville',
  'en',
  0.91,
  372,
  '[Business] Khaya Property Services after-hours line, Thandi speaking. [Customer] Thandi, it''s Bongani Dlamini at unit 4C in Melville. There is water coming through the kitchen ceiling. I only noticed it now. [Business] I''m with you. Is it a drip or a stream, and is anyone in danger downstairs? [Customer] It''s a steady leak onto the counter. The lights are still on. I switched the geyser off at the wall. [Business] Good. Leave the geyser off. Put a bucket under it and keep people out of that corner. I''m logging this as after-hours emergency. [Customer] The unit above is 5C. I banged on the door, nobody answered. I think they''re away. [Business] I have 5C as the Mokoenas, travelling this week. I''ll WhatsApp them and send Sipho with a stopcock key. Can you see a wet patch spreading toward the stove? [Customer] Yes, toward the stove. I unplugged the kettle and the toaster. The floor is wet near the fridge as well. [Business] Unplug the fridge if you can do it without standing in the water. If not, leave it. I''m dispatching Sipho now — he can be there in about twenty-five minutes from Westdene. [Customer] Twenty-five is fine. Should I open the ceiling trap? I can see a stain around the hatch. [Business] Do not open the hatch. If a pipe has burst you will get a dump of water. Sipho will isolate at the stopcock for 5C first. [Customer] Okay. Photos — do you want them on this WhatsApp before he arrives? [Business] Yes. Ceiling, counter, floor by the fridge, and the geyser switch so we can show the insurer you isolated it. I''ll attach them to the job card. [Customer] I''ll send four photos after we hang up. Is this going through insurance or is it a Khaya call-out fee tonight? [Business] Tonight is emergency isolation, no fee to you. If 5C''s pipe failed, their contents cover and the building policy split the repair. I''ll write that in the minutes so nobody bills you by mistake. [Customer] Thank you. The laminate is bubbling. I don''t want to argue about that next week. [Business] Noted: visible laminate swell at the fridge kick. Sipho will photograph it dry-side as well. We log damage tonight, we don''t wait for a weekday complaint. [Customer] Access — I''m in until ten. After that my sister can wait if he''s delayed. [Business] I''ll tell him you are in until ten. If he is later he must call this number, not just arrive. Gate code still 4419? [Customer] 4419, then unit 4C, second floor. Lift is working. [Business] Copied. I''ll also message the night guard so Sipho isn''t stuck at the boom. Once the water is stopped, he''ll mop the worst and leave a dehumidifier if we have one on the van. [Customer] We have towels. Should I start mopping now? [Business] Towels on the floor, yes. Don''t climb on the counter. Keep the kitchen door closed so it doesn''t track into the passage. [Customer] Done. One more thing — the smoke alarm chirped when the water hit near it. It stopped. [Business] Leave the alarm. If it goes off continuously, open a window and step into the passage. I''ll add a battery check to Sipho''s card. [Customer] Alright. I''ll send the photos and wait. Please WhatsApp me when he''s five minutes away. [Business] I will. Job KH-2197, Melville 4C ceiling leak, isolation tonight, damage logged. Stay dry. Khaya after-hours, Thandi.',
  'ready',
  'Melville 4C — after-hours ceiling leak',
  'Bongani Dlamini called the Khaya after-hours line at 19:57 about a steady leak through the kitchen ceiling at Melville unit 4C. He had already switched the geyser off. Thandi dispatched Sipho for isolation at the 5C stopcock (tenants away), logged laminate swell at the fridge, and confirmed tonight is emergency isolation with no call-out fee to 4C. Photos to follow on WhatsApp. Job KH-2197.',
  'After-hours isolation for Melville 4C ceiling leak. Sipho en route (~25 min). No fee to the caller tonight; damage logged for insurance.',
  '["after-hours","leak","isolation","insurance","Melville"]'::jsonb,
  'Calm, practical, relieved once isolation and cost were confirmed.',
  'seeded-test-content',
  s.started_at + interval '8 minutes',
  'ready',
  s.started_at + interval '6 minutes 40 seconds'
from start_local s;

insert into public.transcript_segments (
  business_id, transcript_id, segment_index, meta_segment_id,
  speaker, channel, start_seconds, end_seconds, text, confidence
)
select
  'dbdbdbdb-0000-4000-8000-000000000001'::uuid,
  '20202020-0000-4000-8000-000000000011'::uuid,
  (s.ord - 1)::int,
  'eve-seg-' || s.ord,
  s.who,
  case when s.who = 'Business' then 0 else 1 end,
  s.t,
  s.t + 12,
  s.body,
  0.90
from (
  values
    (1,  'Business', 6,   'Khaya Property Services after-hours line, Thandi speaking.'),
    (2,  'Customer', 14,  'Thandi, it''s Bongani Dlamini at unit 4C in Melville. There is water coming through the kitchen ceiling. I only noticed it now.'),
    (3,  'Business', 28,  'I''m with you. Is it a drip or a stream, and is anyone in danger downstairs?'),
    (4,  'Customer', 38,  'It''s a steady leak onto the counter. The lights are still on. I switched the geyser off at the wall.'),
    (5,  'Business', 50,  'Good. Leave the geyser off. Put a bucket under it and keep people out of that corner. I''m logging this as after-hours emergency.'),
    (6,  'Customer', 66,  'The unit above is 5C. I banged on the door, nobody answered. I think they''re away.'),
    (7,  'Business', 78,  'I have 5C as the Mokoenas, travelling this week. I''ll WhatsApp them and send Sipho with a stopcock key. Can you see a wet patch spreading toward the stove?'),
    (8,  'Customer', 96,  'Yes, toward the stove. I unplugged the kettle and the toaster. The floor is wet near the fridge as well.'),
    (9,  'Business', 110, 'Unplug the fridge if you can do it without standing in the water. If not, leave it. I''m dispatching Sipho now — he can be there in about twenty-five minutes from Westdene.'),
    (10, 'Customer', 128, 'Twenty-five is fine. Should I open the ceiling trap? I can see a stain around the hatch.'),
    (11, 'Business', 140, 'Do not open the hatch. If a pipe has burst you will get a dump of water. Sipho will isolate at the stopcock for 5C first.'),
    (12, 'Customer', 156, 'Okay. Photos — do you want them on this WhatsApp before he arrives?'),
    (13, 'Business', 166, 'Yes. Ceiling, counter, floor by the fridge, and the geyser switch so we can show the insurer you isolated it. I''ll attach them to the job card.'),
    (14, 'Customer', 184, 'I''ll send four photos after we hang up. Is this going through insurance or is it a Khaya call-out fee tonight?'),
    (15, 'Business', 196, 'Tonight is emergency isolation, no fee to you. If 5C''s pipe failed, their contents cover and the building policy split the repair. I''ll write that in the minutes so nobody bills you by mistake.'),
    (16, 'Customer', 216, 'Thank you. The laminate is bubbling. I don''t want to argue about that next week.'),
    (17, 'Business', 228, 'Noted: visible laminate swell at the fridge kick. Sipho will photograph it dry-side as well. We log damage tonight, we don''t wait for a weekday complaint.'),
    (18, 'Customer', 246, 'Access — I''m in until ten. After that my sister can wait if he''s delayed.'),
    (19, 'Business', 258, 'I''ll tell him you are in until ten. If he is later he must call this number, not just arrive. Gate code still 4419?'),
    (20, 'Customer', 272, '4419, then unit 4C, second floor. Lift is working.'),
    (21, 'Business', 282, 'Copied. I''ll also message the night guard so Sipho isn''t stuck at the boom. Once the water is stopped, he''ll mop the worst and leave a dehumidifier if we have one on the van.'),
    (22, 'Customer', 302, 'We have towels. Should I start mopping now?'),
    (23, 'Business', 312, 'Towels on the floor, yes. Don''t climb on the counter. Keep the kitchen door closed so it doesn''t track into the passage.'),
    (24, 'Customer', 326, 'Done. One more thing — the smoke alarm chirped when the water hit near it. It stopped.'),
    (25, 'Business', 338, 'Leave the alarm. If it goes off continuously, open a window and step into the passage. I''ll add a battery check to Sipho''s card.'),
    (26, 'Customer', 354, 'Alright. I''ll send the photos and wait. Please WhatsApp me when he''s five minutes away.'),
    (27, 'Business', 366, 'I will. Job KH-2197, Melville 4C ceiling leak, isolation tonight, damage logged. Stay dry. Khaya after-hours, Thandi.')
) as s(ord, who, t, body);

insert into public.action_items (business_id, transcript_id, text, owner, due_date, status, is_ai_generated)
values
  ('dbdbdbdb-0000-4000-8000-000000000001','20202020-0000-4000-8000-000000000011','Dispatch Sipho to Melville 4C with stopcock key; ETA ~25 minutes from Westdene','Thandi', current_date, 'open', true),
  ('dbdbdbdb-0000-4000-8000-000000000001','20202020-0000-4000-8000-000000000011','WhatsApp 5C (Mokoenas) and the night guard about access','Thandi', current_date, 'open', true),
  ('dbdbdbdb-0000-4000-8000-000000000001','20202020-0000-4000-8000-000000000011','Photograph isolation, laminate swell, and geyser switch for the insurer','Sipho', current_date, 'open', true);

insert into public.meeting_decisions (business_id, transcript_id, text, kind, is_ai_generated)
values
  ('dbdbdbdb-0000-4000-8000-000000000001','20202020-0000-4000-8000-000000000011','Tonight is emergency isolation only — no call-out fee to unit 4C.','decision', true),
  ('dbdbdbdb-0000-4000-8000-000000000001','20202020-0000-4000-8000-000000000011','Do not open the ceiling hatch before the stopcock is closed.','agreement', true),
  ('dbdbdbdb-0000-4000-8000-000000000001','20202020-0000-4000-8000-000000000011','Visible laminate damage is logged tonight, not deferred to a weekday complaint.','commitment', true);

insert into public.meeting_follow_ups (business_id, transcript_id, text, owner, due_hint, status, is_ai_generated)
values
  ('dbdbdbdb-0000-4000-8000-000000000001','20202020-0000-4000-8000-000000000011','WhatsApp Bongani when Sipho is five minutes away; attach photos to job KH-2197.','Thandi','Tonight','open', true);

insert into public.transcript_tags (transcript_id, tag_id, business_id)
select '20202020-0000-4000-8000-000000000011', id, 'dbdbdbdb-0000-4000-8000-000000000001'
  from public.tags
 where business_id = 'dbdbdbdb-0000-4000-8000-000000000001'
   and name in ('test-call', 'urgent', 'maintenance');

commit;
