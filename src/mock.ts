export const tableData: any[] = [
    // 表格数据，配置前
    {
        id: 0, // id
        label: '人群1_高CVR', // 名称
        status: 0, // 状态: 0-计算中 1-已完成
        opt: [] // 操作: VIEW-查看结果
    },
    {
        id: 1,
        label: '人群2_高CTR',
        status: 1,
        opt: ['VIEW'], // 操作: VIEW-查看结果

        summary: {
            id: 1,
            label: '人群2_高CTR',
            crowdLabel: '人群包1',
            rulesLabel: 'CTR>3%且人群规模>10000',
            tableCols: [
                {
                    prop: 'combinationLabel',
                    label: '标签组合'
                },
                {
                    prop: 'scale',
                    label: '规模'
                },
                {
                    prop: 'ctr',
                    label: 'CTR'
                },
            ],
            tableData: [
                {
                    combinationLabel: '性别：男 且 年龄：18～24',
                    scale: '200000',
                    ctr: '5%'
                },
                {
                    combinationLabel: '兴趣：二次元',
                    scale: '500000',
                    ctr: '6%'
                }
            ]
        }
    },
];

export const crowdOptions: any[] = [
    // 人群包列表
    {
        label: '人群包1',
        value: 1
    },
    {
        label: '人群包2',
        value: 2
    },
    {
        label: '人群包3',
        value: 3
    },
];

export const metricOptions: any[] = [
    // 指标列表
    {
        label: 'CTR',
        value: 'CTR',
    },
    {
        label: 'CVR',
        value: 'CVR',
    },
    {
        label: 'PV',
        value: 'PV',
    },
    {
        label: 'UV',
        value: 'UV',
    },
    {
        label: '人群规模',
        value: '人群规模',
    },
];

export const operatorOptions: any[] = [
    // 指标列表
    {
        label: '>',
        value: '>',
    },
    {
        label: '>=',
        value: '>=',
    },
    {
        label: '<',
        value: '<',
    },
    {
        label: '<=',
        value: '<=',
    },
    {
        label: '=',
        value: '=',
    },
    {
        label: '!=',
        value: '!=',
    },
]