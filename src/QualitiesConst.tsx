
export type Quality = {
    id: number
    name: string
    score: number
}

export const qualityList = [
    {
        id: 1,
        name: 'Reliability',  //надёжность
        score: 0
    },
    {
        id: 2,
        name: 'Kindness',  //Доброта
        score: 0
    },
    {
        id: 3,
        name: 'Honesty',  //Честность
        score: 0
    },
    {
        id: 4,
        name: 'Loyalty',  //Верность, преданность
        score: 0
    },
    {
        id: 5,
        name: 'Industriousness',  //Трудолюбие, усердие
        score: 0
    },
    {
        id: 6,
        name: 'Courage',  //Смелость, храбрость
        score: 0
    },
    {
        id: 7,
        name: 'Modesty',  //Скромность
        score: 0
    },
    {
        id: 8,
        name: 'Prudence',  //Рассудительность
        score: 0
    },
    {
        id: 9,
        name: 'Naturalness',  //Естественность
        score: 0
    },
    {
        id: 10,
        name: 'Tolerance',  //Терпимость, толерантность
        score: 0
    }
] as const;

export const myQualityList = [
    {
        id: 2,
        name: 'Kindness:',
        score: 9
    },
    {
        id:5,
        name: 'Industriousness:',
        score: 7
    },
    {
        id: 3,
        name: 'Honesty:',
        score: 8
    },
    {
        id: 9,
        name: 'Naturalness:',
        score: 10
    },

];

export type ShapeName = typeof qualityList[number]['name']