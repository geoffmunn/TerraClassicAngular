// Swap contracts can be found here
// https://assets.terra.money/cw20/pairs.dex.json
export const NON_ULUNA_COINS: any = {
    //TERRASWAP_UUSD_TO_ULUNA_ADDRESS   : 'terra1l7vy20x940je7lskm6x9s839vjsmekz9k9mv7g',
    //KUJI_SMART_CONTACT_ADDRESS        : 'terra1xfsdgcemqwxp4hhnyk4rle6wr22sseq7j07dnn',
    //TERRASWAP_UKRW_TO_ULUNA_ADDRESS   : 'terra1erfdlgdtt9e05z0j92wkndwav4t75xzyapntkv',
    //TERRASWAP_ULUNA_TO_UUSD_ADDRESS   : 'terra1l7vy20x940je7lskm6x9s839vjsmekz9k9mv7g',
    BASE_SMART_CONTRACT_ADDRESS       : 'terra1uewxz67jhhhs2tj97pfm2egtk7zqxuhenm4y4m',
    //GRDX_SMART_CONTRACT_ADDRESS       : 'terra1mkl973d34jsuv0whsfl43yw3sktm8kv7lgn35fhe6l88d0vvaukq5nq929',
    GRDX_SMART_CONTRACT_ADDRESS       : 'terra12f3f5fzfzxckc0qlv3rmwwkjfhzevpwmx77345n0zuu2678vxf0sm6vvcw',
    //TERRASWAP_GRDX_TO_LUNC_ADDRESS    : 'terra12f3f5fzfzxckc0qlv3rmwwkjfhzevpwmx77345n0zuu2678vxf0sm6vvcw',
    LENNY_SMART_CONTRACT_ADDRESS      : 'terra1gcr97yaq923qaxa3gzn70kpx29c28m2c3prxn66vev3segea7y4qps5vj4',
    //TERRAPORT_SWAP_ADDRESS            : 'terra1vrqd7fkchyc7wjumn8fxly88z7kath4djjls3yc5th5g76f3543salu48s',
    CREMAT_SMART_CONTRACT_ADDRESS     : 'terra1zkhwtm4a559emekwj7z4vklzqupgjyad8ncpwvav38y5ef6g5tjse7ceus',
    CANDY_SMART_CONTRACT_ADDRESS      : 'terra1nuwdr5zaul2gnq88xapq8ythmaw4092kt8lxsl6jd36h47u8vpcqnrmdcm',
    ELON_SMART_CONTRACT_ADDRESS       : 'terra13d6xlk4d6cfa6c5c7n2ffua5d5fk5ggfq8vsxr34xnxr07nmke0qajzu8y',
    RAKOFF_SMART_CONTRACT_ADDRESS     : 'terra1vhgq25vwuhdhn9xjll0rhl2s67jzw78a4g2t78y5kz89q9lsdskq2pxcj2'
} as const;

export const COIN_ALIASES: any = {
    [NON_ULUNA_COINS.BASE_SMART_CONTRACT_ADDRESS]   : 'BASE',
    [NON_ULUNA_COINS.CANDY_SMART_CONTRACT_ADDRESS]  : 'LNC',
    [NON_ULUNA_COINS.CREMAT_SMART_CONTRACT_ADDRESS] : 'CREMAT',
    [NON_ULUNA_COINS.ELON_SMART_CONTRACT_ADDRESS]   : 'ELON',
    [NON_ULUNA_COINS.LENNY_SMART_CONTRACT_ADDRESS]  : 'Lenny',
    [NON_ULUNA_COINS.RAKOFF_SMART_CONTRACT_ADDRESS] : 'Rakoff',
    [NON_ULUNA_COINS.TERRASWAP_GRDX_TO_LUNC_ADDRESS]: 'GRDX'
}

//Coin constants:
export const COIN_CODES: any = {
    AACRE     : 'aacre',
    AARCH     : 'aarch',
    ACANTO    : 'acanto',
    ACUDOS    : 'acudos',
    AEVMOS    : 'aevmos',
    AFET      : 'afet',
    ANOM      : 'anom',
    APLANQ    : 'aplanq',
    AREBUS    : 'arebus',
    BASECRO   : 'basecro',
    BUSD_WEI  : 'busd-wei',
    EEUR      : 'eeur',
    GRDX      : 'grdx',
    INJ       : 'inj',
    LOKI      : 'loki',
    NANOLIKE  : 'nanolike',
    NCHEQ     : 'ncheq',
    ORAI      : 'orai',
    ROWAN     : 'rowan',
    SWTH      : 'swth',
    UAKT      : 'uakt',
    UATOM     : 'uatom',
    UAUD      : 'uaud',
    UAXL      : 'uaxl',
    UBAND     : 'uband',
    UBASE     : 'ubase',
    UBNT      : 'ubnt',
    UBTSG     : 'ubtsg',
    UCAD      : 'ucad',
    UCANDY    : 'ucandy',
    UCHF      : 'uchf',
    UCMDX     : 'ucmdx',
    UCNY      : 'ucny',
    UCREMAT   : 'ucremat',
    UCTK      : 'uctk',
    UDEC      : 'udec',
    UDKK      : 'udkk',
    UDSM      : 'udsm',
    UDVPN     : 'udvpn',
    UELON     : 'uelon',
    UEUR      : 'ueur',
    UGBP      : 'ugbp',
    UGRAVITON : 'ugraviton',
    UHKD      : 'uhkd',
    UHUAHUA   : 'uhuahua',
    UIDR      : 'uidr',
    UINR      : 'uinr',
    UIOV      : 'uiov',
    UIRIS     : 'uiris',
    UIXO      : 'uixo',
    UJPY      : 'ujpy',
    UJUNO     : 'ujuno',
    UKAVA     : 'ukava',
    UKRW      : 'ukrw',
    UKUJI     : 'ukuji',
    ULAMB     : 'ulamb',
    ULENNY    : 'ulenny',
    ULUNA     : 'uluna',
    ULUNA2    : 'uluna2',
    UMARS     : 'umars',
    UMED      : 'umed',
    UMNT      : 'umnt',
    UMNTL     : 'umntl',
    UMYR      : 'umyr',
    UNGM      : 'ungm',
    UNOK      : 'unok',
    UOSMO     : 'uosmo',
    UPHP      : 'uphp',
    URAKOFF   : 'urakoff',
    UREGEN    : 'uregen',
    USCRT     : 'uscrt',
    USDR      : 'usdr',
    USEK      : 'usek',
    USGD      : 'usgd',
    USOMM     : 'usomm',
    USTARS    : 'ustars',
    USTRD     : 'ustrd',
    UTHB      : 'uthb',
    UTICK     : 'utick',
    UTWT      : 'utwd',
    UUMEE     : 'uumee',
    UUSD      : 'uusd',
    UUSDC     : 'uusdc',
    UVDL      : 'uvdl',
    UWHALE    : 'uwhale',
    UXKI      : 'uxki',
    UXPRT     : 'uxprt',
    WARB      : 'arb-wei',
    WAVAX     : 'wavax-wei',
    WBNB      : 'wbnb-wei',
    WBTC      : 'wbtc-satoshi',
    WDAI      : 'dai-wei',
    WDOT      : 'dot-planck',
    WETH      : 'weth-wei',
    WFRAX     : 'frax-wei',
    WFTM      : 'wftm-wei',
    WLINK     : 'link-wei',
    WMATIC    : 'wmatic-wei'
} as const;

export const FULL_COIN_LOOKUP: any = {
    UAKT:      'Akash',
    AACRE:     'Arable Protocol',
    AARCH:     'Archway',
    UMNTL:     'AssetMantle',
    UATOM:     'Atom',
    UAUD:      'AUTC',
    UAXL:      'Axelar',
    UBAND:     'Band Protocol',
    UBASE:     'BASE',
    UBTSG:     'Bitsong',
    UBNT:      'Bluzelle',
    BUSD_WEI:  'BUSD',          
    ACANTO:    'Canto',
    SWTH:      'Carbon',
    UCAD:      'CATC',
    NCHEQ:     'Cheqd',
    UHUAHUA:   'Chihuahua',
    UCHF:      'CHTC',
    UCMDX:     'Comdex',
    UCNY:      'CNTC',
    UCREMAT:   'CREMAT',
    BASECRO:   'CRO',
    ACUDOS:    'Cudos',
    UDEC:      'Decentr',
    UDSM:      'Desmos',
    UDKK:      'DKTC',
    UNGM:      'e-Money',
    EEUR:      'EEUR',
    UELON:     'ELON',
    UEUR:      'EUTC',
    AEVMOS:    'Evmos',
    AFET:      'Fetch.ai',
    GRDX:      'GRDX',
    UGBP:      'GBTC',
    UGRAVITON: 'Gravity Bridge',
    UHKD:      'HKTC',
    UIDR:      'IDTC',
    INJ:       'Injective',
    UINR:      'INTC',
    UIRIS:     'IRISnet',
    UIXO:      'Ixo Protocol',
    UJPY:      'JPTC',
    UJUNO:     'Juno',
    UKAVA:     'KAVA',
    UXKI:      'Kichain',
    UKRW:      'KRTC',
    UKUJI:     'KUJI',
    ULAMB:     'Lambda',
    ULENNY:    'Lenny',
    NANOLIKE:  'Likecoin',
    UCANDY:    'LNC',
    ULUNA2:    'LUNA',
    ULUNA:     'LUNC',
    UMARS:     'Mars Protocol',
    UMED:      'Medibloc',
    UTICK:     'Microtick',
    UMNT:      'MNTC',
    UMYR:      'MYTC',
    UNOK:      'NOTC',
    LOKI:      'Odin protocol',
    ANOM:      'Onomy Protocol',
    ORAI:      'Oraichain',
    UOSMO:     'OSMO',
    UXPRT:     'Persistance',
    UPHP:      'PHTC',
    APLANQ:    'Planq',
    URAKOFF:   'Rakoff',
    AREBUS:    'Rebus',
    UREGEN:    'Regen',
    USCRT:     'Secret',
    USDR:      'SDTC',
    UDVPN:     'Sentinel',
    USEK:      'SETC',
    USGD:      'SGTC',
    UCTK:      'Shentu',
    ROWAN:     'Sifchain',
    USOMM:     'Sommelier',
    USTARS:    'Stargaze',
    UIOV:      'Starname',
    USTRD:     'Stride',
    UTHB:      'THTC',
    UTWT:      'TWTC',
    UUMEE:     'Umee',
    UUSD:      'USTC',
    UUSDC:     'USDC',
    UVDL:      'Vidulum',
    UWHALE:    'Whale',
    WARB:      'wARB',
    WAVAX:     'wAVAX',
    WBNB:      'wBNB',
    WBTC:      'wBTC',
    WDAI:      'wDAI',
    WDOT:      'wDOT',
    WETH:      'wETH',
    WFRAX:     'wFRAX',
    WFTM:      'wFTM',
    WLINK:     'wLINK',
    WMATIC:    'wMATIC'
} as const;

// var test = {
//     [COIN_CODES.ULUNA]: {
//         'chain_id': 'columbus-5',
//         'coingecko_id':  'terra-luna',
//         'cosmos_name':   'terra',
//         'ibc_channels':  {
//             'uosmo': 'channel-1',
//         },
//         'lcd_urls':      ['https://terra-classic-fcd.publicnode.com', 'https://rest.cosmos.directory/terra', 'https://terra-classic-fcd.publicnode.com'],
//         'precision':     6,
//         'bech32_prefix': 'terra'
//     }
// }

// console.log ('test:', test)
// console.log (test[COIN_CODES.ULUNA])
// console.log (test[COIN_CODES.ULUNA].chain_id)

//type ChainType = Array<{id: string>;

// var chain = {'chain_id': 'columbus-5'}
// interface COINTYPE {
//     //[key: string]: string | boolean | number;
//     [key: string]: {};
// }

// //interface CHAIN {
// //    []
// //}

// var obj: COINTYPE = {
//     // key1: "apple",
//     // key2: true,
//     // key3: 123
//     {{ULUNA}}: {
//         'chain_id': 'columbus-5'
//     }
// };

// console.log (obj)


//let colors: string[] = ["red", "green", "blue"];
//console.log(colors);

//export const CHAIN_DATA:Array<string> = new Array()

export const CHAIN_DATA: any = {
    [COIN_CODES.ULUNA]: {
        'chain_id':      'columbus-5',
        'coingecko_id':  'terra-luna',
        'cosmos_name':   'terra',
        'ibc_channels':  {
            'uosmo': 'channel-1',
        },
        'lcd_urls':      ['https://terra-classic-fcd.publicnode.com', 'https://rest.cosmos.directory/terra', 'https://terra-classic-fcd.publicnode.com'],
        'precision':     6,
        'bech32_prefix': 'terra'
    },
    [COIN_CODES.UOSMO]: {
        'chain_id':      'osmosis-1',
        'coingecko_id':  'osmosis',
        'cosmos_name':   'osmosis',
        'ibc_channels':  {
            [COIN_CODES.AACRE]:     'channel-490',
            [COIN_CODES.AARCH]:     'channel-1429',
            [COIN_CODES.ACANTO]:    'channel-550',
            [COIN_CODES.ACUDOS]:    'channel-298',
            [COIN_CODES.AEVMOS]:    'channel-204',
            [COIN_CODES.AFET]:      'channel-229',
            [COIN_CODES.ANOM]:      'channel-525',
            [COIN_CODES.APLANQ]:    'channel-492',
            [COIN_CODES.AREBUS]:    'channel-355',
            [COIN_CODES.BASECRO]:   'channel-5',
            [COIN_CODES.EEUR]:      'channel-37',
            [COIN_CODES.INJ]:       'channel-122',
            [COIN_CODES.LOKI]:      'channel-258',
            [COIN_CODES.NANOLIKE]:  'channel-53',
            [COIN_CODES.NCHEQ]:     'channel-108',
            [COIN_CODES.ORAI]:      'channel-216',
            [COIN_CODES.ROWAN]:     'channel-47',
            [COIN_CODES.SWTH]:      'channel-188',
            [COIN_CODES.UAKT]:      'channel-1',
            [COIN_CODES.UAXL]:      'channel-208',
            [COIN_CODES.UATOM]:     'channel-0',
            [COIN_CODES.UBAND]:     'channel-148',
            [COIN_CODES.UBNT]:      'channel-763',
            [COIN_CODES.UBTSG]:     'channel-73',
            [COIN_CODES.UCMDX]:     'channel-87',
            [COIN_CODES.UCTK]:      'channel-146',
            [COIN_CODES.UDEC]:      'channel-181',
            [COIN_CODES.UDSM]:      'channel-135',
            [COIN_CODES.UDVPN]:     'channel-2',
            [COIN_CODES.UGRAVITON]: 'channel-144',
            [COIN_CODES.UHUAHUA]:   'channel-113',
            [COIN_CODES.UIOV]:      'channel-15',
            [COIN_CODES.UIRIS]:     'channel-6',
            [COIN_CODES.UIXO]:      'channel-38',
            [COIN_CODES.UJUNO]:     'channel-42',
            [COIN_CODES.UKAVA]:     'channel-143',
            [COIN_CODES.UKUJI]:     'channel-259',
            [COIN_CODES.ULAMB]:     'channel-378',
            [COIN_CODES.ULUNA]:     'channel-72',
            [COIN_CODES.ULUNA2]:    'channel-72',
            [COIN_CODES.UMARS]:     'channel-557',
            [COIN_CODES.UMED]:      'channel-82',
            [COIN_CODES.UMNTL]:     'channel-232',
            [COIN_CODES.UNGM]:      'channel-37',
            [COIN_CODES.UOSMO]:     'channel-1',
            [COIN_CODES.UREGEN]:    'channel-8',
            [COIN_CODES.USCRT]:     'channel-88',
            [COIN_CODES.USOMM]:     'channel-165',
            [COIN_CODES.USTARS]:    'channel-75',
            [COIN_CODES.USTRD]:     'channel-326',
            [COIN_CODES.UTICK]:     'channel-39',
            [COIN_CODES.UUMEE]:     'channel-184',
            [COIN_CODES.UUSD]:      'channel-72',
            [COIN_CODES.UUSDC]:     'channel-208',
            [COIN_CODES.UVDL]:      'channel-124',
            [COIN_CODES.UWHALE]:    'channel-84',
            [COIN_CODES.UXKI]:      'channel-77',
            [COIN_CODES.UXPRT]:     'channel-4',
            [COIN_CODES.WARB]:      'channel-208',
            [COIN_CODES.WAVAX]:     'channel-208',
            [COIN_CODES.WBNB]:      'channel-208',
            [COIN_CODES.WBTC]:      'channel-208',
            [COIN_CODES.WDAI]:      'channel-208',
            [COIN_CODES.WDOT]:      'channel-208',
            [COIN_CODES.WETH]:      'channel-208',
            [COIN_CODES.WFRAX]:     'channel-208',
            [COIN_CODES.WFTM]:      'channel-208',
            [COIN_CODES.WLINK]:     'channel-208',
            [COIN_CODES.WMATIC]:    'channel-208'
        },
        'lcd_urls':      ['https://lcd.osmosis.zone'],
        'precision':     6,
        'bech32_prefix': 'osmo'
    },
    [COIN_CODES.AACRE]: {
        'coingecko_id':  'arable-protocol',
        'cosmos_name':   'acrechain',
        'precision':     18,
        'bech32_prefix': 'acre'
    },
    [COIN_CODES.AARCH]: {
        'coingecko_id':  'archway',
        'cosmos_name':   'archway',
        'precision':     18,
        'bech32_prefix': 'archway'
    },
    [COIN_CODES.ACANTO]: {
        'coingecko_id':  'canto',
        'cosmos_name':   'canto',
        'precision':     18,
        'bech32_prefix': 'canto'
    },
    [COIN_CODES.ACUDOS]: {
        'coingecko_id':  'cudos',
        'cosmos_name':   'cudos',
        'precision':     18,
        'bech32_prefix': 'cudos'
    },
    [COIN_CODES.AEVMOS]: {
        'coingecko_id':  'evmos',
        'cosmos_name':   'evmos',
        'precision':     18,
        'bech32_prefix': 'evmos'
    },
    [COIN_CODES.AFET]: {
        'coingecko_id':  'fetch-ai',
        'cosmos_name':   'fetchhub',
        'precision':     18,
        'bech32_prefix': 'fetch'
    },
    [COIN_CODES.ANOM]: {
        'coingecko_id':  'onomy-protocol',
        'cosmos_name':   'onomy',
        'precision':     18,
        'bech32_prefix': 'onomy'
    },
    [COIN_CODES.APLANQ]: {
        'coingecko_id':  'planq',
        'cosmos_name':   'planq',
        'precision':     18,
        'bech32_prefix': 'plq'
    },
    [COIN_CODES.AREBUS]: {
        'coingecko_id':  'rebus',
        'cosmos_name':   'rebus',
        'precision':     18,
        'bech32_prefix': 'rebus'
    },
    [COIN_CODES.BASECRO]: {
        'coingecko_id':  'crypto-com-chain',
        'cosmos_name':   'cronos',
        'precision':     8,
        'bech32_prefix': 'cro'
    },
    [COIN_CODES.EEUR]: {
        'coingecko_id': 'e-money-eur',
        'cosmos_name': 'emoney',
        'precision': 6,
        'bech32_prefix': 'emoney'
    },
    [COIN_CODES.INJ]: {
        'coingecko_id':  'injective-protocol',
        'cosmos_name':   'injective',
        'precision':     18,
        'bech32_prefix': 'inj'
    },
    [COIN_CODES.LOKI]: {
        'coingecko_id':  'odin-protocol',
        'cosmos_name':   'odin',
        'precision':     6,
        'bech32_prefix': 'odin'
    },
    [COIN_CODES.NANOLIKE]: {
        'coingecko_id':  'likecoin',
        'cosmos_name':   'likecoin',
        'precision':     9,
        'bech32_prefix': 'like'
    },
    [COIN_CODES.NCHEQ]: {
        'coingecko_id':  'cheqd-network',
        'cosmos_name':   'cheqd',
        'precision':     9,
        'bech32_prefix': 'cheqd'
    },
    [COIN_CODES.ORAI]: {
        'coingecko_id':  'oraichain-token',
        'cosmos_name':   'oraichain',
        'precision':     6,
        'bech32_prefix': 'orai'
    },
    [COIN_CODES.ROWAN]: {
        'coingecko_id':  'sifchain',
        'cosmos_name':   'sifchain',
        'precision':     18,
        'bech32_prefix': 'sif'
    },
    [COIN_CODES.SWTH]: {
        'coingecko_id':  'switcheo',
        'cosmos_name':   'carbon',
        'precision':     8,
        'bech32_prefix': 'swth'
    },
    [COIN_CODES.UAKT]: {
        'coingecko_id':  'akash-network',
        'cosmos_name':   'akash',
        'precision':     6,
        'bech32_prefix': 'akash'
    },
    [COIN_CODES.UATOM]: {
        'coingecko_id':  'cosmos',
        'cosmos_name':   'cosmos',
        'precision':     6,
        'bech32_prefix': 'cosmos'
    },
    [COIN_CODES.UAXL]: {
        'coingecko_id':  'axelar',
        'cosmos_name':   'axelar',
        'precision':     6,
        'bech32_prefix': 'axelar'
    },
    [COIN_CODES.UBAND]: {
        'coingecko_id':  'band-protocol',
        'cosmos_name':   'bandchain',
        'precision':     6,
        'bech32_prefix': 'band'
    },
    [COIN_CODES.UBNT]: {
        'coingecko_id':  'bluzelle',
        'cosmos_name':   'bluzelle',
        'precision':     6,
        'bech32_prefix': 'bluzelle'
    },
    [COIN_CODES.UBTSG]: {
        'coingecko_id':  'bitsong',
        'cosmos_name':   'bitsong',
        'precision':     6,
        'bech32_prefix': 'bitsong'
    },
    [COIN_CODES.UCMDX]: {
        'coingecko_id':  'comdex',
        'cosmos_name':   'comdex',
        'precision':     6,
        'bech32_prefix': 'comdex'
    },
    [COIN_CODES.UCTK]: {
        'coingecko_id':  'certik',
        'cosmos_name':   'shentu',
        'precision':     6,
        'bech32_prefix': 'shentu'
    },
    [COIN_CODES.UDEC]: {
        'coingecko_id':  'decentr',
        'cosmos_name':   'decentr',
        'precision':     6,
        'bech32_prefix': 'decentr'
    },
    [COIN_CODES.UDSM]: {
        'coingecko_id':  'desmos',
        'cosmos_name':   'desmos',
        'precision':     6,
        'bech32_prefix': 'desmos'
    },
    [COIN_CODES.UDVPN]: {
        'coingecko_id':  'sentinel',
        'cosmos_name':   'sentinel',
        'precision':     6,
        'bech32_prefix': 'sent'
    },
    [COIN_CODES.UGRAVITON]: {
        'coingecko_id':  'graviton',
        'cosmos_name':   'gravitybridge',
        'precision':     6,
        'bech32_prefix': 'gravity'
    },
    [COIN_CODES.UHUAHUA]: {
        'coingecko_id':  'chihuahua-token',
        'cosmos_name':   'chihuahua',
        'precision':     6,
        'bech32_prefix': 'chihuahua'
    },
    [COIN_CODES.UIOV]: {
        'coingecko_id':  'starname',
        'cosmos_name':   'starname',
        'precision':     6,
        'bech32_prefix': 'star'
    },
    [COIN_CODES.UIRIS]: {
        'coingecko_id':  'iris-network',
        'cosmos_name':   'irisnet',
        'precision':     6,
        'bech32_prefix': 'iaa'
    },
    [COIN_CODES.UIXO]: {
        'coingecko_id':  'ixo',
        'cosmos_name':   'impacthub',
        'precision':     6,
        'bech32_prefix': 'ixo'
    },
    [COIN_CODES.UJUNO]: {
        'coingecko_id':  'juno-network',
        'cosmos_name':   'juno',
        'precision':     6,
        'bech32_prefix': 'juno'
    },
    [COIN_CODES.UKAVA]: {
        'coingecko_id':  'kava',
        'cosmos_name':   'kava',
        'precision':     6,
        'bech32_prefix': 'kava'
    },
    [COIN_CODES.UKUJI]: {
        'coingecko_id':  'kujira',
        'cosmos_name':   'kujira',
        'precision':     6,
        'bech32_prefix': 'kujira'
    },
    [COIN_CODES.ULAMB]: {
        'coingecko_id':  'lambda',
        'cosmos_name':   'lambda',
        'precision':     18,
        'bech32_prefix': 'lamb'
    },
    [COIN_CODES.ULUNA2]: {
        'coingecko_id':  'terra-luna-2',
        'cosmos_name':   'terra2',
        'precision':     6,
        'bech32_prefix': 'terra'
    },
    [COIN_CODES.UMARS]: {
        'coingecko_id':  'mars-protocol-a7fcbcfb-fd61-4017-92f0-7ee9f9cc6da3',
        'cosmos_name':   'mars',
        'precision':     6,
        'bech32_prefix': 'mars'
    },
    [COIN_CODES.UMED]: {
        'coingecko_id':  'medibloc',
        'cosmos_name':   'panacea',
        'precision':     6,
        'bech32_prefix': 'panacea'
    },
    [COIN_CODES.UMNTL]: {
        'coingecko_id':  'assetmantle',
        'cosmos_name':   'assetmantle',
        'precision':     6,
        'bech32_prefix': 'mantle'
    },
    [COIN_CODES.UNGM]: {
        'coingecko_id':  'e-money',
        'cosmos_name':   'emoney',
        'precision':     6,
        'bech32_prefix': 'emoney'
    },
    [COIN_CODES.UREGEN]: {
        'coingecko_id':  'regen',
        'cosmos_name':   'regen',
        'precision':     6,
        'bech32_prefix': 'regen'
    },
    [COIN_CODES.USCRT]: {
        'coingecko_id':  'secret',
        'cosmos_name':   'secret',
        'precision':     6,
        'bech32_prefix': 'secret'
    },
    [COIN_CODES.USOMM]: {
        'coingecko_id':  'sommelier',
        'cosmos_name':   'sommelier',
        'precision':     6,
        'bech32_prefix': 'somm'
    },
    [COIN_CODES.USTARS]: {
        'coingecko_id':  'stargaze',
        'cosmos_name':   'stargaze',
        'precision':     6,
        'bech32_prefix': 'stars'
    },
    [COIN_CODES.USTRD]: {
        'coingecko_id':  'stride',
        'cosmos_name':   'stride',
        'precision':     6,
        'bech32_prefix': 'stride'
    },
    [COIN_CODES.UTICK]: {
        'coingecko_id':  'microtick',
        'cosmos_name':   'microtick',
        'precision':     6,
        'bech32_prefix': 'micro'
    },
    [COIN_CODES.UUMEE]: {
        'coingecko_id':  'umee',
        'cosmos_name':   'umee',
        'precision':     6,
        'bech32_prefix': 'umee'
    },
    [COIN_CODES.UUSD]: {
        'coingecko_id':  'terrausd',
        'cosmos_name':   'terra',
        'precision':     6,
        'bech32_prefix': 'terra'
    },
    [COIN_CODES.UUSDC]: {
        'coingecko_id':  'usd-coin',
        'cosmos_name':   'axelar',
        'precision':     6,
        'bech32_prefix': 'axelar'
    },
    [COIN_CODES.UVDL]: {
        'coingecko_id':  'vidulum',
        'cosmos_name':   'vidulum',
        'precision':     6,
        'bech32_prefix': 'vdl'
    },
    [COIN_CODES.UWHALE]: {
        'coingecko_id':  'white-whale',
        'cosmos_name':   'whale',
        'precision':     6,
        'bech32_prefix': 'migaloo'
    },
    [COIN_CODES.UXKI]: {
        'coingecko_id':  'ki',
        'cosmos_name':   'kichain',
        'precision':     6,
        'bech32_prefix': 'ki'
    },
    [COIN_CODES.UXPRT]: {
        'coingecko_id':  'persistence',
        'cosmos_name':   'persistence',
        'precision':     6,
        'bech32_prefix': 'persistence'
    },
    [COIN_CODES.WARB]: {
        'coingecko_id':  'arbitrum',
        'cosmos_name':   'axelar',
        'precision':     18,
        'bech32_prefix': 'axelar'
    },
    [COIN_CODES.WAVAX]: {
        'coingecko_id':  'avalanche-2',
        'cosmos_name':   'axelar',
        'precision':     18,
        'bech32_prefix': 'axelar'
    },
    [COIN_CODES.WBNB]: {
        'coingecko_id':  'binancecoin',
        'cosmos_name':   'axelar',
        'precision':     18,
        'bech32_prefix': 'axelar'
    },
    [COIN_CODES.WBTC]: {
        'coingecko_id':  'bitcoin',
        'cosmos_name':   'axelar',
        'precision':     8,
        'bech32_prefix': 'axelar'
    },
    [COIN_CODES.WDAI]: {
        'coingecko_id':  'dai',
        'cosmos_name':   'axelar',
        'precision':     18,
        'bech32_prefix': 'axelar'
    },
    [COIN_CODES.WDOT]: {
        'coingecko_id':  'polkadot',
        'cosmos_name':   'axelar',
        'precision':     10,
        'bech32_prefix': 'axelar'
    },
    [COIN_CODES.WETH]: {
        'coingecko_id':  'ethereum',
        'cosmos_name':   'axelar',
        'precision':     18,
        'bech32_prefix': 'axelar'
    },
    [COIN_CODES.WFRAX]: {
        'coingecko_id':  'frax',
        'cosmos_name':   'axelar',
        'precision':     18,
        'bech32_prefix': 'axelar'
    },
    [COIN_CODES.WFTM]: {
        'coingecko_id':  'fantom',
        'cosmos_name':   'axelar',
        'precision':     18,
        'bech32_prefix': 'axelar'
    },
    [COIN_CODES.WLINK]: {
        'coingecko_id':  'chainlink',
        'cosmos_name':   'axelar',
        'precision':     18,
        'bech32_prefix': 'axelar'
    },
    [COIN_CODES.WMATIC]: {
        'coingecko_id':  'matic-network',
        'cosmos_name':   'axelar',
        'precision':     18,
        'bech32_prefix': 'axelar'
    }
} as const;

//console.log ('xxx:', CHAIN_DATA[COIN_CODES.ULUNA].cosmos_name)