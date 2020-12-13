import React, { Component } from 'react'
import { fetch_users } from '../ConnectServer'
import { Chart } from "react-google-charts"

const countMap = new Map([['Aruba', 'AW'], ['Afghanistan', 'AF'], ['Angola', 'AO'], ['Anguilla', 'AI'], ['Åland Islands', 'AX'], ['Albania', 'AL'], ['Andorra', 'AD'], ['United Arab Emirates', 'AE'], ['Argentina', 'AR'], ['Armenia', 'AM'], ['American Samoa', 'AS'], ['Antarctica', 'AQ'], ['French Southern Territories', 'TF'], ['Antigua and Barbuda', 'AG'], ['Australia', 'AU'], ['Austria', 'AT'], ['Azerbaijan', 'AZ'], ['Burundi', 'BI'], ['Belgium', 'BE'], ['Benin', 'BJ'], ['Bonaire, Sint Eustatius and Saba', 'BQ'], ['Burkina Faso', 'BF'], ['Bangladesh', 'BD'], ['Bulgaria', 'BG'], ['Bahrain', 'BH'], ['Bahamas', 'BS'], ['Bosnia and Herzegovina', 'BA'], ['Saint Barthélemy', 'BL'], ['Belarus', 'BY'], ['Belize', 'BZ'], ['Bermuda', 'BM'], ['Bolivia, Plurinational State of', 'BO'], ['Brazil', 'BR'], ['Barbados', 'BB'], ['Brunei Darussalam', 'BN'], ['Bhutan', 'BT'], ['Bouvet Island', 'BV'], ['Botswana', 'BW'], ['Central African Republic', 'CF'], ['Canada', 'CA'], ['Cocos (Keeling) Islands', 'CC'], ['Switzerland', 'CH'], ['Chile', 'CL'], ['China', 'CN'], ["Côte d'Ivoire", 'CI'], ['Cameroon', 'CM'], ['Congo, The Democratic Republic of the', 'CD'], ['Congo', 'CG'], ['Cook Islands', 'CK'], ['Colombia', 'CO'], ['Comoros', 'KM'], ['Cabo Verde', 'CV'], ['Costa Rica', 'CR'], ['Cuba', 'CU'], ['Curaçao', 'CW'], ['Christmas Island', 'CX'], ['Cayman Islands', 'KY'], ['Cyprus', 'CY'], ['Czechia', 'CZ'], ['Germany', 'DE'], ['Djibouti', 'DJ'], ['Dominica', 'DM'], ['Denmark', 'DK'], ['Dominican Republic', 'DO'], ['Algeria', 'DZ'], ['Ecuador', 'EC'], ['Egypt', 'EG'], ['Eritrea', 'ER'], ['Western Sahara', 'EH'], ['Spain', 'ES'], ['Estonia', 'EE'], ['Ethiopia', 'ET'], ['Finland', 'FI'], ['Fiji', 'FJ'], ['Falkland Islands (Malvinas)', 'FK'], ['France', 'FR'], ['Faroe Islands', 'FO'], ['Micronesia, Federated States of', 'FM'], ['Gabon', 'GA'], ['United Kingdom', 'GB'], ['Georgia', 'GE'], ['Guernsey', 'GG'], ['Ghana', 'GH'], ['Gibraltar', 'GI'], ['Guinea', 'GN'], ['Guadeloupe', 'GP'], ['Gambia', 'GM'], ['Guinea-Bissau', 'GW'], ['Equatorial Guinea', 'GQ'], ['Greece', 'GR'], ['Grenada', 'GD'], ['Greenland', 'GL'], ['Guatemala', 'GT'], ['French Guiana', 'GF'], ['Guam', 'GU'], ['Guyana', 'GY'], ['Hong Kong', 'HK'], ['Heard Island and McDonald Islands', 'HM'], ['Honduras', 'HN'], ['Croatia', 'HR'], ['Haiti', 'HT'], ['Hungary', 'HU'], ['Indonesia', 'ID'], ['Isle of Man', 'IM'], ['India', 'IN'], ['British Indian Ocean Territory', 'IO'], ['Ireland', 'IE'], ['Iran, Islamic Republic of', 'IR'], ['Iraq', 'IQ'], ['Iceland', 'IS'], ['Israel', 'IL'], ['Italy', 'IT'], ['Jamaica', 'JM'], ['Jersey', 'JE'], ['Jordan', 'JO'], ['Japan', 'JP'], ['Kazakhstan', 'KZ'], ['Kenya', 'KE'], ['Kyrgyzstan', 'KG'], ['Cambodia', 'KH'], ['Kiribati', 'KI'], ['Saint Kitts and Nevis', 'KN'], ['Korea, Republic of', 'KR'], ['Kuwait', 'KW'], ["Lao People's Democratic Republic", 'LA'], ['Lebanon', 'LB'], ['Liberia', 'LR'], ['Libya', 'LY'], ['Saint Lucia', 'LC'], ['Liechtenstein', 'LI'], ['Sri Lanka', 'LK'], ['Lesotho', 'LS'], ['Lithuania', 'LT'], ['Luxembourg', 'LU'], ['Latvia', 'LV'], ['Macao', 'MO'], ['Saint Martin (French part)', 'MF'], ['Morocco', 'MA'], ['Monaco', 'MC'], ['Moldova, Republic of', 'MD'], ['Madagascar', 'MG'], ['Maldives', 'MV'], ['Mexico', 'MX'], ['Marshall Islands', 'MH'], ['North Macedonia', 'MK'], ['Mali', 'ML'], ['Malta', 'MT'], ['Myanmar', 'MM'], ['Montenegro', 'ME'], ['Mongolia', 'MN'], ['Northern Mariana Islands', 'MP'], ['Mozambique', 'MZ'], ['Mauritania', 'MR'], ['Montserrat', 'MS'], ['Martinique', 'MQ'], ['Mauritius', 'MU'], ['Malawi', 'MW'], ['Malaysia', 'MY'], ['Mayotte', 'YT'], ['Namibia', 'NA'], ['New Caledonia', 'NC'], ['Niger', 'NE'], ['Norfolk Island', 'NF'], ['Nigeria', 'NG'], ['Nicaragua', 'NI'], ['Niue', 'NU'], ['Netherlands', 'NL'], ['Norway', 'NO'], ['Nepal', 'NP'], ['Nauru', 'NR'], ['New Zealand', 'NZ'], ['Oman', 'OM'], ['Pakistan', 'PK'], ['Panama', 'PA'], ['Pitcairn', 'PN'], ['Peru', 'PE'], ['Philippines', 'PH'], ['Palau', 'PW'], ['Papua New Guinea', 'PG'], ['Poland', 'PL'], ['Puerto Rico', 'PR'], ["Korea, Democratic People's Republic of", 'KP'], ['Portugal', 'PT'], ['Paraguay', 'PY'], ['Palestine, State of', 'PS'], ['French Polynesia', 'PF'], ['Qatar', 'QA'], ['Réunion', 'RE'], ['Romania', 'RO'], ['Russian Federation', 'RU'], ['Rwanda', 'RW'], ['Saudi Arabia', 'SA'], ['Sudan', 'SD'], ['Senegal', 'SN'], ['Singapore', 'SG'], ['South Georgia and the South Sandwich Islands', 'GS'], ['Saint Helena, Ascension and Tristan da Cunha', 'SH'], ['Svalbard and Jan Mayen', 'SJ'], ['Solomon Islands', 'SB'], ['Sierra Leone', 'SL'], ['El Salvador', 'SV'], ['San Marino', 'SM'], ['Somalia', 'SO'], ['Saint Pierre and Miquelon', 'PM'], ['Serbia', 'RS'], ['South Sudan', 'SS'], ['Sao Tome and Principe', 'ST'], ['Suriname', 'SR'], ['Slovakia', 'SK'], ['Slovenia', 'SI'], ['Sweden', 'SE'], ['Eswatini', 'SZ'], ['Sint Maarten (Dutch part)', 'SX'], ['Seychelles', 'SC'], ['Syrian Arab Republic', 'SY'], ['Turks and Caicos Islands', 'TC'], ['Chad', 'TD'], ['Togo', 'TG'], ['Thailand', 'TH'], ['Tajikistan', 'TJ'], ['Tokelau', 'TK'], ['Turkmenistan', 'TM'], ['Timor-Leste', 'TL'], ['Tonga', 'TO'], ['Trinidad and Tobago', 'TT'], ['Tunisia', 'TN'], ['Turkey', 'TR'], ['Tuvalu', 'TV'], ['Taiwan, Province of China', 'TW'], ['Tanzania, United Republic of', 'TZ'], ['Uganda', 'UG'], ['Ukraine', 'UA'], ['United States Minor Outlying Islands', 'UM'], ['Uruguay', 'UY'], ['United States', 'US'], ['Uzbekistan', 'UZ'], ['Holy See (Vatican City State)', 'VA'], ['Saint Vincent and the Grenadines', 'VC'], ['Venezuela, Bolivarian Republic of', 'VE'], ['Virgin Islands, British', 'VG'], ['Virgin Islands, U.S.', 'VI'], ['Viet Nam', 'VN'], ['Vanuatu', 'VU'], ['Wallis and Futuna', 'WF'], ['Samoa', 'WS'], ['Yemen', 'YE'], ['South Africa', 'ZA'], ['Zambia', 'ZM'], ['Zimbabwe', 'ZW']]);

class AdminCountryDistribution extends Component {

    constructor() {
        super()
        this.state = {
            errors: {},
            geo_data: []
        }
    }

    componentDidMount() {
        fetch_users().then(res => {
            if (res) {
                var country_map = new Map()
                for (var i = 0; i < res.length; i++) {
                    var obj = res[i].country
                    if (country_map.has(obj)){
                        
                        country_map.set(obj, country_map.get(obj)+1)
                    }
                    else{
                        country_map.set(obj, 1)
                    } 
                }
                var geo_data = [['Country', 'Popularity']];
                var get_entries = country_map.entries()
                for (var ele of get_entries)
                    if(ele[0]==="gen")
                        geo_data.push(ele);
                    else
                        geo_data.push([{v: countMap.get(ele[0]), f:ele[0]}, ele[1]]);
                this.setState({geo_data, geo_data}) 
            }
            else {
                this.props.history.push('/admin/home')
            }
        })
    }

    render() {
        return(
            <div>
                <Chart
                    width={'90vw'}
                    height={'90vh'}
                    chartType="GeoChart"
                    data={this.state.geo_data}
                    rootProps={{ 'data-testid': '1' }}
                    // options={{
                    //     region: 'IE',
                    //     displayMode: 'regions',
                    //     resolution: 'provinces'
                    // }}
                />
            </div>
        )
    }
}

export default AdminCountryDistribution