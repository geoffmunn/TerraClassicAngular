
const ULUNA = 'uluna';

export const CHAIN_DATA = {
    'ULUNA': {
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
    'UOSMO': {
        'chain_id':      'osmosis-1',
        'coingecko_id':  'osmosis',
        'cosmos_name':   'osmosis',
        'ibc_channels':  {
            'AACRE':     'channel-490',
            AARCH:     'channel-1429',
            ACANTO:    'channel-550',
            ACUDOS:    'channel-298',
            AEVMOS:    'channel-204',
            AFET:      'channel-229',
            ANOM:      'channel-525',
            APLANQ:    'channel-492',
            AREBUS:    'channel-355',
            BASECRO:   'channel-5',
            EEUR:      'channel-37',
            INJ:       'channel-122',
            LOKI:      'channel-258',
            NANOLIKE:  'channel-53',
            NCHEQ:     'channel-108',
            ORAI:      'channel-216',
            ROWAN:     'channel-47',
            SWTH:      'channel-188',
            UAKT:      'channel-1',
            UAXL:      'channel-208',
            UATOM:     'channel-0',
            UBAND:     'channel-148',
            UBNT:      'channel-763',
            UBTSG:     'channel-73',
            UCMDX:     'channel-87',
            UCTK:      'channel-146',
            UDEC:      'channel-181',
            UDSM:      'channel-135',
            UDVPN:     'channel-2',
            UGRAVITON: 'channel-144',
            UHUAHUA:   'channel-113',
            UIOV:      'channel-15',
            UIRIS:     'channel-6',
            UIXO:      'channel-38',
            UJUNO:     'channel-42',
            UKAVA:     'channel-143',
            UKUJI:     'channel-259',
            ULAMB:     'channel-378',
            ULUNA:     'channel-72',
            ULUNA2:    'channel-72',
            UMARS:     'channel-557',
            UMED:      'channel-82',
            UMNTL:     'channel-232',
            UNGM:      'channel-37',
            UOSMO:     'channel-1',
            UREGEN:    'channel-8',
            USCRT:     'channel-88',
            USOMM:     'channel-165',
            USTARS:    'channel-75',
            USTRD:     'channel-326',
            UTICK:     'channel-39',
            UUMEE:     'channel-184',
            UUSD:      'channel-72',
            UUSDC:     'channel-208',
            UVDL:      'channel-124',
            UWHALE:    'channel-84',
            UXKI:      'channel-77',
            UXPRT:     'channel-4',
            WARB:      'channel-208',
            WAVAX:     'channel-208',
            WBNB:      'channel-208',
            WBTC:      'channel-208',
            WDAI:      'channel-208',
            WDOT:      'channel-208',
            WETH:      'channel-208',
            WFRAX:     'channel-208',
            WFTM:      'channel-208',
            WLINK:     'channel-208',
            WMATIC:    'channel-208'
        },
        'lcd_urls':      ['https://lcd.osmosis.zone'],
        'precision':     6,
        'bech32_prefix': 'osmo'
    },
    'AACRE': {
        'coingecko_id':  'arable-protocol',
        'cosmos_name':   'acrechain',
        'precision':     18,
        'bech32_prefix': 'acre'
    },
    'AARCH': {
        'coingecko_id':  'archway',
        'cosmos_name':   'archway',
        'precision':     18,
        'bech32_prefix': 'archway'
    },
    'ACANTO': {
        'coingecko_id':  'canto',
        'cosmos_name':   'canto',
        'precision':     18,
        'bech32_prefix': 'canto'
    },
    'ACUDOS': {
        'coingecko_id':  'cudos',
        'cosmos_name':   'cudos',
        'precision':     18,
        'bech32_prefix': 'cudos'
    },
    'AEVMOS': {
        'coingecko_id':  'evmos',
        'cosmos_name':   'evmos',
        'precision':     18,
        'bech32_prefix': 'evmos'
    },
    'AFET': {
        'coingecko_id':  'fetch-ai',
        'cosmos_name':   'fetchhub',
        'precision':     18,
        'bech32_prefix': 'fetch'
    },
    'ANOM': {
        'coingecko_id':  'onomy-protocol',
        'cosmos_name':   'onomy',
        'precision':     18,
        'bech32_prefix': 'onomy'
    },
    'APLANQ': {
        'coingecko_id':  'planq',
        'cosmos_name':   'planq',
        'precision':     18,
        'bech32_prefix': 'plq'
    },
    'AREBUS': {
        'coingecko_id':  'rebus',
        'cosmos_name':   'rebus',
        'precision':     18,
        'bech32_prefix': 'rebus'
    },
    'BASECRO': {
        'coingecko_id':  'crypto-com-chain',
        'cosmos_name':   'cronos',
        'precision':     8,
        'bech32_prefix': 'cro'
    },
    'EEUR': {
        'coingecko_id': 'e-money-eur',
        'cosmos_name': 'emoney',
        'precision': 6,
        'bech32_prefix': 'emoney'
    },
    'INJ': {
        'coingecko_id':  'injective-protocol',
        'cosmos_name':   'injective',
        'precision':     18,
        'bech32_prefix': 'inj'
    },
    'LOKI': {
        'coingecko_id':  'odin-protocol',
        'cosmos_name':   'odin',
        'precision':     6,
        'bech32_prefix': 'odin'
    },
    'NANOLIKE': {
        'coingecko_id':  'likecoin',
        'cosmos_name':   'likecoin',
        'precision':     9,
        'bech32_prefix': 'like'
    },
    'NCHEQ': {
        'coingecko_id':  'cheqd-network',
        'cosmos_name':   'cheqd',
        'precision':     9,
        'bech32_prefix': 'cheqd'
    },
    'ORAI': {
        'coingecko_id':  'oraichain-token',
        'cosmos_name':   'oraichain',
        'precision':     6,
        'bech32_prefix': 'orai'
    },
    'ROWAN': {
        'coingecko_id':  'sifchain',
        'cosmos_name':   'sifchain',
        'precision':     18,
        'bech32_prefix': 'sif'
    },
    'SWTH': {
        'coingecko_id':  'switcheo',
        'cosmos_name':   'carbon',
        'precision':     8,
        'bech32_prefix': 'swth'
    },
    'UAKT': {
        'coingecko_id':  'akash-network',
        'cosmos_name':   'akash',
        'precision':     6,
        'bech32_prefix': 'akash'
    },
    'UATOM': {
        'coingecko_id':  'cosmos',
        'cosmos_name':   'cosmos',
        'precision':     6,
        'bech32_prefix': 'cosmos'
    },
    'UAXL': {
        'coingecko_id':  'axelar',
        'cosmos_name':   'axelar',
        'precision':     6,
        'bech32_prefix': 'axelar'
    },
    'UBAND': {
        'coingecko_id':  'band-protocol',
        'cosmos_name':   'bandchain',
        'precision':     6,
        'bech32_prefix': 'band'
    },
    'UBNT': {
        'coingecko_id':  'bluzelle',
        'cosmos_name':   'bluzelle',
        'precision':     6,
        'bech32_prefix': 'bluzelle'
    },
    'UBTSG': {
        'coingecko_id':  'bitsong',
        'cosmos_name':   'bitsong',
        'precision':     6,
        'bech32_prefix': 'bitsong'
    },
    'UCMDX': {
        'coingecko_id':  'comdex',
        'cosmos_name':   'comdex',
        'precision':     6,
        'bech32_prefix': 'comdex'
    },
    'UCTK': {
        'coingecko_id':  'certik',
        'cosmos_name':   'shentu',
        'precision':     6,
        'bech32_prefix': 'shentu'
    },
    'UDEC': {
        'coingecko_id':  'decentr',
        'cosmos_name':   'decentr',
        'precision':     6,
        'bech32_prefix': 'decentr'
    },
    'UDSM': {
        'coingecko_id':  'desmos',
        'cosmos_name':   'desmos',
        'precision':     6,
        'bech32_prefix': 'desmos'
    },
    'UDVPN': {
        'coingecko_id':  'sentinel',
        'cosmos_name':   'sentinel',
        'precision':     6,
        'bech32_prefix': 'sent'
    },
    'UGRAVITON': {
        'coingecko_id':  'graviton',
        'cosmos_name':   'gravitybridge',
        'precision':     6,
        'bech32_prefix': 'gravity'
    },
    'UHUAHUA': {
        'coingecko_id':  'chihuahua-token',
        'cosmos_name':   'chihuahua',
        'precision':     6,
        'bech32_prefix': 'chihuahua'
    },
    'UIOV': {
        'coingecko_id':  'starname',
        'cosmos_name':   'starname',
        'precision':     6,
        'bech32_prefix': 'star'
    },
    'UIRIS': {
        'coingecko_id':  'iris-network',
        'cosmos_name':   'irisnet',
        'precision':     6,
        'bech32_prefix': 'iaa'
    },
    'UIXO': {
        'coingecko_id':  'ixo',
        'cosmos_name':   'impacthub',
        'precision':     6,
        'bech32_prefix': 'ixo'
    },
    'UJUNO': {
        'coingecko_id':  'juno-network',
        'cosmos_name':   'juno',
        'precision':     6,
        'bech32_prefix': 'juno'
    },
    'UKAVA': {
        'coingecko_id':  'kava',
        'cosmos_name':   'kava',
        'precision':     6,
        'bech32_prefix': 'kava'
    },
    'UKUJI': {
        'coingecko_id':  'kujira',
        'cosmos_name':   'kujira',
        'precision':     6,
        'bech32_prefix': 'kujira'
    },
    'ULAMB': {
        'coingecko_id':  'lambda',
        'cosmos_name':   'lambda',
        'precision':     18,
        'bech32_prefix': 'lamb'
    },
    'ULUNA2': {
        'coingecko_id':  'terra-luna-2',
        'cosmos_name':   'terra2',
        'precision':     6,
        'bech32_prefix': 'terra'
    },
    'UMARS': {
        'coingecko_id':  'mars-protocol-a7fcbcfb-fd61-4017-92f0-7ee9f9cc6da3',
        'cosmos_name':   'mars',
        'precision':     6,
        'bech32_prefix': 'mars'
    },
    'UMED': {
        'coingecko_id':  'medibloc',
        'cosmos_name':   'panacea',
        'precision':     6,
        'bech32_prefix': 'panacea'
    },
    'UMNTL': {
        'coingecko_id':  'assetmantle',
        'cosmos_name':   'assetmantle',
        'precision':     6,
        'bech32_prefix': 'mantle'
    },
    'UNGM': {
        'coingecko_id':  'e-money',
        'cosmos_name':   'emoney',
        'precision':     6,
        'bech32_prefix': 'emoney'
    },
    'UREGEN': {
        'coingecko_id':  'regen',
        'cosmos_name':   'regen',
        'precision':     6,
        'bech32_prefix': 'regen'
    },
    'USCRT': {
        'coingecko_id':  'secret',
        'cosmos_name':   'secret',
        'precision':     6,
        'bech32_prefix': 'secret'
    },
    'USOMM': {
        'coingecko_id':  'sommelier',
        'cosmos_name':   'sommelier',
        'precision':     6,
        'bech32_prefix': 'somm'
    },
    'USTARS': {
        'coingecko_id':  'stargaze',
        'cosmos_name':   'stargaze',
        'precision':     6,
        'bech32_prefix': 'stars'
    },
    'USTRD': {
        'coingecko_id':  'stride',
        'cosmos_name':   'stride',
        'precision':     6,
        'bech32_prefix': 'stride'
    },
    'UTICK': {
        'coingecko_id':  'microtick',
        'cosmos_name':   'microtick',
        'precision':     6,
        'bech32_prefix': 'micro'
    },
    'UUMEE': {
        'coingecko_id':  'umee',
        'cosmos_name':   'umee',
        'precision':     6,
        'bech32_prefix': 'umee'
    },
    'UUSD': {
        'coingecko_id':  'terrausd',
        'cosmos_name':   'terra',
        'precision':     6,
        'bech32_prefix': 'terra'
    },
    'UUSDC': {
        'coingecko_id':  'usd-coin',
        'cosmos_name':   'axelar',
        'precision':     6,
        'bech32_prefix': 'axelar'
    },
    'UVDL': {
        'coingecko_id':  'vidulum',
        'cosmos_name':   'vidulum',
        'precision':     6,
        'bech32_prefix': 'vdl'
    },
    'UWHALE': {
        'coingecko_id':  'white-whale',
        'cosmos_name':   'whale',
        'precision':     6,
        'bech32_prefix': 'migaloo'
    },
    'UXKI': {
        'coingecko_id':  'ki',
        'cosmos_name':   'kichain',
        'precision':     6,
        'bech32_prefix': 'ki'
    },
    'UXPRT': {
        'coingecko_id':  'persistence',
        'cosmos_name':   'persistence',
        'precision':     6,
        'bech32_prefix': 'persistence'
    },
    'WARB': {
        'coingecko_id':  'arbitrum',
        'cosmos_name':   'axelar',
        'precision':     18,
        'bech32_prefix': 'axelar'
    },
    'WAVAX': {
        'coingecko_id':  'avalanche-2',
        'cosmos_name':   'axelar',
        'precision':     18,
        'bech32_prefix': 'axelar'
    },
    'WBNB': {
        'coingecko_id':  'binancecoin',
        'cosmos_name':   'axelar',
        'precision':     18,
        'bech32_prefix': 'axelar'
    },
    'WBTC': {
        'coingecko_id':  'bitcoin',
        'cosmos_name':   'axelar',
        'precision':     8,
        'bech32_prefix': 'axelar'
    },
    'WDAI': {
        'coingecko_id':  'dai',
        'cosmos_name':   'axelar',
        'precision':     18,
        'bech32_prefix': 'axelar'
    },
    'WDOT': {
        'coingecko_id':  'polkadot',
        'cosmos_name':   'axelar',
        'precision':     10,
        'bech32_prefix': 'axelar'
    },
    'WETH': {
        'coingecko_id':  'ethereum',
        'cosmos_name':   'axelar',
        'precision':     18,
        'bech32_prefix': 'axelar'
    },
    'WFRAX': {
        'coingecko_id':  'frax',
        'cosmos_name':   'axelar',
        'precision':     18,
        'bech32_prefix': 'axelar'
    },
    'WFTM': {
        'coingecko_id':  'fantom',
        'cosmos_name':   'axelar',
        'precision':     18,
        'bech32_prefix': 'axelar'
    },
    'WLINK': {
        'coingecko_id':  'chainlink',
        'cosmos_name':   'axelar',
        'precision':     18,
        'bech32_prefix': 'axelar'
    },
    'WMATIC': {
        'coingecko_id':  'matic-network',
        'cosmos_name':   'axelar',
        'precision':     18,
        'bech32_prefix': 'axelar'
    }
} as const;