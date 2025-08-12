export const TEAMS = [
  { name: "연세대학교 이글스", logo: "/assets/images/svg/teams/Yonsei Eagles.svg" },
  { name: "서울대학교 그린테러스", logo: "/assets/images/svg/teams/SNU Green Terrors.svg" },
  { name: "한양대학교 라이온스", logo: "/assets/images/svg/teams/Hanyang Lions.svg" },
  { name: "국민대학교 레이저백스", logo: "/assets/images/svg/teams/Kookmin Razorbacks.svg" },
  { name: "서울시립대학교 시티혹스", logo: "/assets/images/svg/teams/UOS City Hawks.svg" },
  { name: "한국외국어대학교 블랙나이츠", logo: "/assets/images/svg/teams/HUFS Black Knights.svg" },
  { name: "건국대학교 레이징불스", logo: "/assets/images/svg/teams/Konkuk Raging Bulls.svg" },
  { name: "홍익대학교 카우보이스", logo: "/assets/images/svg/teams/Hongik Cowboys.svg" },
  { name: "동국대학교 터스커스", logo: "/assets/images/svg/teams/Dongguk Tuskers.svg" },
  { name: "고려대학교 타이거스", logo: "/assets/images/svg/teams/Korea University Tigers.svg" },
  { name: "중앙대학교 블루드래곤스", logo: "/assets/images/svg/teams/ChungAng Blue Dragons.svg" },
  { name: "숭실대학교 크루세이더스", logo: "/assets/images/svg/teams/Soongsil Crusaders.svg" },
  { name: "서강대학교 알바트로스", logo: "/assets/images/svg/teams/Sogang Albatross.svg" },
  { name: "경희대학교 커맨더스", logo: "/assets/images/svg/teams/Kyunghee Commanders.svg" },
];

export const FALL_2024_DATA = {
  season: "2024",
  event: "추계",
  divisions: [
    {
      name: "1부",
      groups: [
        {
          name: "1조",
          teams: [
            "연세대학교 이글스",
            "한양대학교 라이온스",
            "한국외국어대학교 블랙나이츠",
            "고려대학교 타이거스",
          ],
          matches: [
            { stage: "조별", date: "", location: "", home: "연세대학교 이글스", away: "고려대학교 타이거스", homeScore: 36, awayScore: 0, winner: "연세대학교 이글스" },
            { stage: "조별", date: "", location: "", home: "연세대학교 이글스", away: "한국외국어대학교 블랙나이츠", homeScore: 41, awayScore: 0, winner: "연세대학교 이글스" },
            { stage: "조별", date: "", location: "", home: "연세대학교 이글스", away: "한양대학교 라이온스", homeScore: 14, awayScore: 12, winner: "연세대학교 이글스" },
            { stage: "조별", date: "", location: "", home: "한양대학교 라이온스", away: "한국외국어대학교 블랙나이츠", homeScore: 27, awayScore: 6, winner: "한양대학교 라이온스" },
            { stage: "조별", date: "", location: "", home: "한양대학교 라이온스", away: "고려대학교 타이거스", homeScore: 13, awayScore: 9, winner: "한양대학교 라이온스" },
            { stage: "조별", date: "", location: "", home: "한국외국어대학교 블랙나이츠", away: "고려대학교 타이거스", homeScore: 13, awayScore: 12, winner: "한국외국어대학교 블랙나이츠" },
          ],
        },
        {
          name: "2조",
          teams: [
            "서울대학교 그린테러스",
            "국민대학교 레이저백스",
            "서울시립대학교 시티혹스",
            "동국대학교 터스커스",
          ],
          matches: [
            { stage: "조별", date: "", location: "", home: "서울대학교 그린테러스", away: "서울시립대학교 시티혹스", homeScore: 38, awayScore: 7, winner: "서울대학교 그린테러스" },
            { stage: "조별", date: "", location: "", home: "서울대학교 그린테러스", away: "동국대학교 터스커스", homeScore: 41, awayScore: 6, winner: "서울대학교 그린테러스" },
            { stage: "조별", date: "", location: "", home: "서울대학교 그린테러스", away: "국민대학교 레이저백스", homeScore: 27, awayScore: 13, winner: "서울대학교 그린테러스" },
            { stage: "조별", date: "", location: "", home: "국민대학교 레이저백스", away: "동국대학교 터스커스", homeScore: 36, awayScore: 0, winner: "국민대학교 레이저백스" },
            { stage: "조별", date: "", location: "", home: "국민대학교 레이저백스", away: "서울시립대학교 시티혹스", homeScore: 20, awayScore: 0, winner: "국민대학교 레이저백스" },
            { stage: "조별", date: "", location: "", home: "서울시립대학교 시티혹스", away: "동국대학교 터스커스", homeScore: 21, awayScore: 19, winner: "서울시립대학교 시티혹스" },
          ],
        },
      ],
      final:[
        { stage: "결승전", date: "", location: "", home: "서울대학교 그린테러스", away: "연세대학교 이글스", homeScore: 7, awayScore: 19, winner: "연세대학교 이글스" },
      ],
      playoffs: [
        { stage: "3,4위전", date: "", location: "", home: "국민대학교 레이저백스", away: "한양대학교 라이온스", homeScore: 13, awayScore: 22, winner: "한양대학교 라이온스" },
        { stage: "5,6위전", date: "", location: "", home: "서울시립대학교 시티혹스", away: "한국외국어대학교 블랙나이츠", homeScore: 16, awayScore: 6, winner: "서울시립대학교 시티혹스" },
        { stage: "7,8위전", date: "", location: "", home: "동국대학교 터스커스", away: "고려대학교 타이거스", homeScore: 8, awayScore: 10, winner: "고려대학교 타이거스" },
      ],
      promotion: [
        { stage: "승강전", date: "", location: "", home: "고려대학교 타이거스", away: "홍익대학교 카우보이스", homeScore: 6, awayScore: 36, winner: "홍익대학교 카우보이스" },
      ],
    },
    {
      name: "2부",
      groups: [
        {
          name: "1조",
          teams: [
            "건국대학교 레이징불스",
            "숭실대학교 크루세이더스",
            "경희대학교 커맨더스",
          ],
          matches: [
            { stage: "조별", date: "", location: "", home: "건국대학교 레이징불스", away: "경희대학교 커맨더스", homeScore: 35, awayScore: 13, winner: "건국대학교 레이징불스" },
            { stage: "조별", date: "", location: "", home: "건국대학교 레이징불스", away: "숭실대학교 크루세이더스", homeScore: 40, awayScore: 0, winner: "건국대학교 레이징불스" },
            { stage: "조별", date: "", location: "", home: "숭실대학교 크루세이더스", away: "경희대학교 커맨더스", homeScore: 32, awayScore: 6, winner: "숭실대학교 크루세이더스" },
          ],
        },
        {
          name: "2조",
          teams: [
            "홍익대학교 카우보이스",
            "중앙대학교 블루드래곤스",
            "서강대학교 알바트로스",
          ],
          matches: [
            { stage: "조별", date: "", location: "", home: "홍익대학교 카우보이스", away: "중앙대학교 블루드래곤스", homeScore: 13, awayScore: 6, winner: "홍익대학교 카우보이스" },
            { stage: "조별", date: "", location: "", home: "홍익대학교 카우보이스", away: "서강대학교 알바트로스", homeScore: 34, awayScore: 7, winner: "홍익대학교 카우보이스" },
            { stage: "조별", date: "", location: "", home: "중앙대학교 블루드래곤스", away: "서강대학교 알바트로스", homeScore: 20, awayScore: 6, winner: "중앙대학교 블루드래곤스" },
          ],
        },
      ],
      final:[
        { stage: "결승전", date: "", location: "", home: "홍익대학교 카우보이스", away: "건국대학교 레이징불스", homeScore: 8, awayScore: 25, winner: "건국대학교 레이징불스" },
      ],
      playoffs: [
        { stage: "3,4위 결정전", date: "", location: "", home: "중앙대학교 블루드래곤스", away: "숭실대학교 크루세이더스", homeScore: 6, awayScore: 22, winner: "숭실대학교 크루세이더스" },
        { stage: "5,6위 결정전", date: "", location: "", home: "서강대학교 알바트로스", away: "경희대학교 커맨더스", status: "기권", homeScore: null, awayScore: null, winner: "경희대학교 커맨더스" },
      ],
      promotion: [
        { stage: "승강전", date: "", location: "", home: "고려대학교 타이거스", away: "홍익대학교 카우보이스", homeScore: 6, awayScore: 36, winner: "홍익대학교 카우보이스" },
      ],
    },
  ],
};
