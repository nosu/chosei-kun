import Event from './models/event';

export default function () {
  Event.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const event1 = new Event({
      title: '忘年会',
      memo: '忘年会の予定調整です',
      dates: ['12/10 夜', '12/12 夜', '12/13 夜'],
      members: [
        { name: '田中部長', schedule: [0, 2, 1] },
        { name: '山田課長', schedule: [2, 1, 0] },
        { name: '佐藤', schedule: [2, 2, 2] },
      ],
      eventId: 'cikqgkv4q01ck7453ualdn3hd'
    });
    const event2 = new Event({
      title: '同窓会',
      memo: '同窓会の予定調整です',
      dates: ['12/10 18:00', '12/12 19時頃', '12/13', '12/14'],
      members: [
        { name: 'ゆうき', schedule: [0, 2, 1] },
        { name: 'しんじ', schedule: [2, 1, 0] },
        { name: 'けんじ', schedule: [2, 2, 2] },
        { name: 'やすお', schedule: [2, 2, 2] },
      ],
      eventId: 'cikqgkv4q01ck7453ualdn3hf'
    });

    Event.create([event1, event2], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}
