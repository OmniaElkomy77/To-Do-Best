import images from "../common/images";

export type Country = {
    code: string;
    name: string;
    flag: any;
};
export const countries: Country[] =
    [
        { code: "EG", name: "Egypt", flag: images.Egypt },
        { code: "SA", name: "Saudi Arabia", flag: images.SaudiArabia },
        { code: "AF", name: "Afghanistan", flag: images.Afghanistan },
        { code: "AL", name: "Albania", flag: images.Albania },
        { code: "DZ", name: "Algeria", flag: images.Algeria },
        // { code: "AS", name: "American Samoa",flag:images. },
        { code: "AD", name: "Andorra", flag: images.Andorra },
        { code: "AO", name: "Angola", flag: images.Angola },
        // { code: "AI", name: "Anguilla",flag:images.Ang },
        // { code: "AQ", name: "Antarctica",flag:images.Ant },
        // { code: "AG", name: "Antigua and Barbuda", flag: images.AntiguaAndBarbuda },
        { code: "AR", name: "Argentina", flag: images.Argentina },
        { code: "AM", name: "Armenia", flag: images.Armenia },

        // { code: "AW", name: "Aruba" ,flag:images.Aruba},
        { code: "AU", name: "Australia", flag: images.Australia },
        { code: "AT", name: "Austria", flag: images.Austria },
        { code: "AZ", name: "Azerbaijan", flag: images.Azerbaijan },

        { code: "BS", name: "Bahamas", flag: images.Bahamas },
        { code: "BH", name: "Bahrain", flag: images.Bahrain },
        { code: "BD", name: "Bangladesh", flag: images.Bangladesh },

        { code: "BB", name: "Barbados", flag: images.Barbados },
        { code: "BY", name: "Belarus", flag: images.Belarus },
        { code: "BE", name: "Belgium", flag: images.Belgium },

        { code: "BZ", name: "Belize", flag: images.Belize },
        { code: "BJ", name: "Benin", flag: images.Benin },
        // { code: "BM", name: "Bermuda",flag:images.Bermu },

        { code: "BT", name: "Bhutan", flag: images.Bhutan },
        { code: "BO", name: "Bolivia", flag: images.Bolivia },
        { code: "BA", name: "Bosnia and Herzegovina", flag: images.BosniaAndHerzegovina },

        { code: "BW", name: "Botswana", flag: images.Botswana },
        { code: "BR", name: "Brazil", flag: images.Brazil },
        { code: "BN", name: "Brunei", flag: images.Brunei },

        { code: "BG", name: "Bulgaria", flag: images.Bulgaria },
        { code: "BF", name: "Burkina Faso", flag: images.BurkinaFaso },
        { code: "BI", name: "Burundi", flag: images.Burundi },

        { code: "KH", name: "Cambodia", flag: images.Cambodia },
        { code: "CM", name: "Cameroon", flag: images.Cameroon },
        { code: "CA", name: "Canada", flag: images.Canada },

        { code: "CV", name: "Cape Verde", flag: images.CapeVerde },
        // { code: "KY", name: "Cayman Islands", flag: images.Cay },
        { code: "CF", name: "Central African Republic", flag: images.CentralAfricanRepublic },

        { code: "TD", name: "Chad", flag: images.Chad },
        { code: "CL", name: "Chile", flag: images.Chile },
        { code: "CN", name: "China", flag: images.China },

        { code: "CO", name: "Colombia", flag: images.Colombia },
        { code: "KM", name: "Comoros", flag: images.Comoros },
        // { code: "CG", name: "Congo", flag: images.CON },

        { code: "CD", name: "Democratic Republic of the Congo", flag: images.DemocraticRepulicOfTheCongo },
        { code: "CR", name: "Costa Rica", flag: images.CostaRica },
        { code: "HR", name: "Croatia", flag: images.Croatia },

        { code: "CU", name: "Cuba", flag: images.Cuba },
        { code: "CY", name: "Cyprus", flag: images.Cyprus },
        { code: "CZ", name: "Czech Republic", flag: images.CzechRepublic },
        { code: "DK", name: "Denmark", flag: images.Denmark },

        { code: "DJ", name: "Djibouti", flag: images.Djibouti },
        { code: "DM", name: "Dominica", flag: images.Dominica },
        { code: "DO", name: "Dominican Republic", flag: images.DominicanRepublic },

        { code: "EC", name: "Ecuador", flag: images.Ecuador },
        { code: "SV", name: "El Salvador", flag: images.ElSalvador },
        // { code: "GQ", name: "Equatorial Guinea", flag: images.Eq },

        { code: "ER", name: "Eritrea", flag: images.Eritrea },
        { code: "EE", name: "Estonia", flag: images.Estonia },
        { code: "SZ", name: "Eswatini", flag: images.Eswatini },

        { code: "ET", name: "Ethiopia", flag: images.Ethiopia },
        { code: "FJ", name: "Fiji", flag: images.Fiji },
        { code: "FI", name: "Finland", flag: images.Finland },

        { code: "FR", name: "France", flag: images.France },
        { code: "GA", name: "Gabon", flag: images.Gabon },
        { code: "GM", name: "Gambia", flag: images.Gambia },

        { code: "GE", name: "Georgia", flag: images.Georgia },
        { code: "DE", name: "Germany", flag: images.Germany },
        { code: "GH", name: "Ghana", flag: images.Ghana },

        { code: "GR", name: "Greece", flag: images.Greece },
        { code: "GD", name: "Grenada", flag: images.Grenada },
        { code: "GT", name: "Guatemala", flag: images.Guatemala },

        { code: "GN", name: "Guinea", flag: images.Guinea },
        { code: "GW", name: "Guinea-Bissau", flag: images.GuineaBissau },
        { code: "GY", name: "Guyana", flag: images.Guyana },

        { code: "HT", name: "Haiti", flag: images.Haiti },
        { code: "HN", name: "Honduras", flag: images.Honduras },
        { code: "HU", name: "Hungary", flag: images.Hungary },

        { code: "IS", name: "Iceland", flag: images.Iceland },
        { code: "IN", name: "India", flag: images.India },
        { code: "ID", name: "Indonesia", flag: images.Indonesia },

        { code: "IR", name: "Iran", flag: images.Iran },
        { code: "IQ", name: "Iraq", flag: images.Iraq },
        { code: "IE", name: "Ireland", flag: images.Ireland },

        { code: "IT", name: "Italy", flag: images.Italy },
        { code: "JM", name: "Jamaica", flag: images.Jamaica },
        { code: "JP", name: "Japan", flag: images.Japan },

        { code: "JO", name: "Jordan", flag: images.Jordan },
        { code: "KZ", name: "Kazakhstan", flag: images.Kazakhstan },
        { code: "KE", name: "Kenya", flag: images.Kenya },
        { code: "KI", name: "Kiribati", flag: images.Kiribati },

        { code: "KP", name: "North Korea", flag: images.NorthKorea },
        // { code: "KR", name: "South Korea", flag: images.SOUTH },
        { code: "KW", name: "Kuwait", flag: images.Kuwait },

        { code: "KG", name: "Kyrgyzstan", flag: images.Kazakhstan },
        { code: "LA", name: "Laos", flag: images.Laos },
        { code: "LV", name: "Latvia", flag: images.Latvia },

        { code: "LB", name: "Lebanon", flag: images.Lebanon },
        { code: "LS", name: "Lesotho", flag: images.Lesotho },
        { code: "LR", name: "Liberia", flag: images.Liberia },

        { code: "LY", name: "Libya", flag: images.Libya },
        { code: "LI", name: "Liechtenstein", flag: images.Liechtenstein },
        { code: "LT", name: "Lithuania", flag: images.Lithuania },

        { code: "LU", name: "Luxembourg", flag: images.Luxembourg },
        { code: "MG", name: "Madagascar", flag: images.Madagascar },
        { code: "MW", name: "Malawi", flag: images.Malawi },

        { code: "MY", name: "Malaysia", flag: images.Malaysia },
        { code: "MV", name: "Maldives", flag: images.Maldives },
        { code: "ML", name: "Mali", flag: images.Mali },

        { code: "MT", name: "Malta", flag: images.Malta },
        { code: "MH", name: "Marshall Islands", flag: images.MarshallIslands },
        { code: "MR", name: "Mauritania", flag: images.Mauritania },

        { code: "MU", name: "Mauritius", flag: images.Mauritius },
        { code: "MX", name: "Mexico", flag: images.Mexico },
        { code: "FM", name: "Micronesia", flag: images.Micronesia },

        { code: "MD", name: "Moldova", flag: images.Moldova },
        { code: "MC", name: "Monaco", flag: images.Monaco },
        { code: "MN", name: "Mongolia", flag: images.Mongolia },

        { code: "ME", name: "Montenegro", flag: images.Montenegro },
        { code: "MA", name: "Morocco", flag: images.Morocco },
        { code: "MZ", name: "Mozambique", flag: images.Mozambique },

        { code: "MM", name: "Myanmar", flag: images.Myanmar },
        { code: "NA", name: "Namibia", flag: images.Namibia },
        { code: "NR", name: "Nauru", flag: images.Nauru },

        { code: "NP", name: "Nepal", flag: images.Nepal },
        { code: "NL", name: "Netherlands", flag: images.Netherlands },
        { code: "NZ", name: "New Zealand", flag: images.NewZealand },

        { code: "NI", name: "Nicaragua", flag: images.Nicaragua },
        { code: "NE", name: "Niger", flag: images.Niger },
        { code: "NG", name: "Nigeria", flag: images.Nigeria },

        { code: "NO", name: "Norway", flag: images.Norway },
        { code: "OM", name: "Oman", flag: images.Oman },
        { code: "PK", name: "Pakistan", flag: images.Pakistan },

        { code: "PW", name: "Palau", flag: images.Palau },
        { code: "PA", name: "Panama", flag: images.Panama },
        { code: "PG", name: "Papua New Guinea", flag: images.PapuaNewGuinea },

        { code: "PY", name: "Paraguay", flag: images.Paraguay },
        { code: "PE", name: "Peru", flag: images.Peru },
        { code: "PH", name: "Philippines", flag: images.Philippines },

        { code: "PL", name: "Poland", flag: images.Poland },
        { code: "PT", name: "Portugal", flag: images.Portugal },
        { code: "QA", name: "Qatar", flag: images.Qatar },

        { code: "RO", name: "Romania", flag: images.Romania },
        { code: "RU", name: "Russia", flag: images.Russia },
        { code: "RW", name: "Rwanda", flag: images.Rwanda },

        { code: "KN", name: "Saint Kitts and Nevis", flag: images.SaintKittsAndNevis },
        // { code: "LC", name: "Saint Lucia" ,flag:images.SAIN},
        // { code: "VC", name: "Saint Vincent and the Grenadines" ,flag:images.SA},

        { code: "WS", name: "Samoa", flag: images.Samoa },
        { code: "SM", name: "San Marino", flag: images.SanMarino },
        { code: "ST", name: "Sao Tome and Principe", flag: images.SaoTomeAndPrincipe },

        { code: "SN", name: "Senegal", flag: images.Senegal },
        { code: "RS", name: "Serbia", flag: images.Serbia },
        { code: "SC", name: "Seychelles", flag: images.Seychelles },

        { code: "SL", name: "Sierra Leone", flag: images.SierraLeone },
        { code: "SG", name: "Singapore", flag: images.Singapore },
        { code: "SK", name: "Slovakia", flag: images.Slovakia },

        { code: "SI", name: "Slovenia", flag: images.Slovenia },
        { code: "SB", name: "Solomon Islands", flag: images.SolomonIslands },
        { code: "SO", name: "Somalia", flag: images.Somalia },

        { code: "ZA", name: "South Africa", flag: images.SouthAfrica },
        // { code: "SS", name: "South Sudan" ,flag:images.SOTH},
        { code: "ES", name: "Spain", flag: images.Spain },

        { code: "LK", name: "Sri Lanka", flag: images.SriLanka },
        { code: "SD", name: "Sudan", flag: images.Sudan },
        { code: "SR", name: "Suriname", flag: images.Suriname },

        { code: "SE", name: "Sweden", flag: images.Sweden },
        { code: "CH", name: "Switzerland", flag: images.Switzerland },
        { code: "SY", name: "Syria", flag: images.Syria },

        { code: "TJ", name: "Tajikistan", flag: images.Tajikistan },
        { code: "TZ", name: "Tanzania", flag: images.Tanzania },
        { code: "TH", name: "Thailand", flag: images.Thailand },

        // { code: "TL", name: "Timor-Leste" ,flag:images.TIM},
        { code: "TG", name: "Togo", flag: images.Togo },
        { code: "TO", name: "Tonga", flag: images.Tonga },

        { code: "TT", name: "Trinidad and Tobago", flag: images.TrinidadAndTobago },
        { code: "TN", name: "Tunisia", flag: images.Tunisia },
        { code: "TR", name: "Turkey", flag: images.Turkey },

        { code: "TM", name: "Turkmenistan", flag: images.Turkmenistan },
        { code: "TV", name: "Tuvalu", flag: images.Tuvalu },
        { code: "UG", name: "Uganda", flag: images.Uganda },
        { code: "UA", name: "Ukraine", flag: images.Ukraine },

        { code: "AE", name: "United Arab Emirates", flag: images.UniteArabEmirates },
        { code: "GB", name: "United Kingdom", flag: images.UnitedKingdom },
        // { code: "US", name: "United States", flag: images.UNIT },

        { code: "UY", name: "Uruguay", flag: images.Uruguay },
        { code: "UZ", name: "Uzbekistan", flag: images.Uzbekistan },
        { code: "VU", name: "Vanuatu", flag: images.Vanuatu },
        { code: "VE", name: "Venezuela", flag: images.Venezuela },

        { code: "VN", name: "Vietnam", flag: images.Vietnam },
        { code: "YE", name: "Yemen", flag: images.Yemen },
        { code: "ZM", name: "Zambia", flag: images.Zambia },

        { code: "ZW", name: "Zimbabwe", flag: images.Zimbabwe },
    ];



