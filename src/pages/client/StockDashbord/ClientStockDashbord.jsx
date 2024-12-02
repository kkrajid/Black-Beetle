import React from 'react';
import { NavbarSecond } from './NavbarSecond';
import { StockDashboard } from '../../../components/features/client/ClientComponents'
const Curve =`<svg  width="100%" height="100%" viewBox="0 0 1000 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.38">
            <path d="M1544.44 143.251C1603.96 254.736 1866.19 222.351 1957.22 135.162C2064.09 32.925 1923.15 -223.001 1886.2 -273.111C1863.05 -304.495 1786.8 -96.4091 1651.86 -75.5516C1509.85 -53.6145 1425.56 -153.547 1438.07 -127.17C1437.45 -105.264 1472.67 8.71083 1544.44 143.251Z" stroke="url(#paint0_linear_312_1615)" stroke-opacity="0.19" stroke-width="5" stroke-miterlimit="10" />
            <path d="M1540.1 170.807C1597.59 297.058 1891.51 253.682 1989.44 155.235C2105.82 38.2543 1938.4 -225.375 1901.94 -291.678C1881.46 -328.878 1783.27 -124.192 1632.65 -94.0606C1475.91 -62.5756 1382.9 -148.054 1406.46 -113.413C1421.53 -91.2172 1469.99 16.8689 1540.1 170.807Z" stroke="url(#paint1_linear_312_1615)" stroke-opacity="0.19" stroke-width="5" stroke-miterlimit="10" />
            <path d="M1535.68 198.354C1591.26 339.362 1916.78 284.997 2021.54 175.257C2147.38 43.465 1927.25 -221.156 1917.7 -310.361C1912.7 -356.573 1779.72 -152.158 1613.43 -112.648C1441.91 -71.9468 1333.29 -138.785 1374.87 -99.7473C1400.63 -75.4219 1467.38 24.9782 1535.68 198.354Z" stroke="url(#paint2_linear_312_1615)" stroke-opacity="0.19" stroke-width="5" stroke-miterlimit="10" />
            <path d="M1531.29 225.919C1584.95 381.661 1941.91 316.322 2053.66 195.298C2188.91 48.6588 1937.07 -224.92 1933.25 -328.934C1931.39 -379.825 1776 -180.052 1594.04 -131.139C1407.69 -81.0484 1283.98 -128.756 1343.07 -85.9969C1380.14 -59.1827 1464.82 33.0755 1531.29 225.919Z" stroke="url(#paint3_linear_312_1615)" stroke-opacity="0.19" stroke-width="5" stroke-miterlimit="10" />
            <path d="M1526.88 253.498C1578.7 423.954 1967.18 347.54 2085.79 215.321C2230.45 53.9082 1946.45 -228.848 1948.92 -347.559C1950.07 -403.224 1772.29 -208.02 1574.74 -149.698C1373.64 -90.3188 1235.12 -118.629 1311.38 -72.2976C1359.87 -42.8116 1462.35 41.2086 1526.88 253.498Z" stroke="url(#paint4_linear_312_1615)" stroke-opacity="0.19" stroke-width="5" stroke-miterlimit="10" />
            <path d="M1522.46 281.069C1572.47 466.232 1992.4 378.893 2117.91 235.337C2271.98 59.1012 1955.63 -232.965 1964.62 -366.197C1968.71 -426.752 1768.65 -236.04 1555.47 -168.247C1339.56 -99.5897 1186.49 -108.52 1279.7 -58.6054C1339.77 -26.3888 1459.87 49.2544 1522.46 281.069Z" stroke="url(#paint5_linear_312_1615)" stroke-opacity="0.19" stroke-width="5" stroke-miterlimit="10" />
            <path d="M1518.07 308.637C1566.4 508.603 2017.59 410.182 2150.01 255.362C2313.48 64.3596 1964.48 -237.203 1980.24 -384.813C1987.23 -450.35 1764.93 -264.036 1536.16 -186.78C1305.42 -108.869 1137.9 -98.4693 1247.97 -44.8725C1319.76 -9.9582 1457.47 57.3391 1518.07 308.637Z" stroke="url(#paint6_linear_312_1615)" stroke-opacity="0.19" stroke-width="5" stroke-miterlimit="10" />
            <path d="M1513.66 336.21C1560.1 550.823 2042.78 441.519 2182.13 275.379C2354.96 69.463 1973.25 -241.68 1995.9 -403.442C2005.75 -474.029 1761.23 -292.09 1516.86 -205.345C1271.28 -118.174 1089.46 -88.3548 1216.29 -31.1783C1299.79 6.48272 1455.09 65.4406 1513.66 336.21Z" stroke="url(#paint7_linear_312_1615)" stroke-opacity="0.19" stroke-width="5" stroke-miterlimit="10" />
            <path d="M1509.25 363.785C1553.92 593.117 2067.93 472.711 2214.25 295.399C2396.43 74.6242 1981.96 -246.038 2011.5 -422.051C2024.24 -497.724 1757.55 -320.123 1497.49 -223.864C1237.09 -127.464 1040.98 -78.281 1184.53 -17.4625C1279.85 22.8944 1452.71 73.5442 1509.25 363.785Z" stroke="url(#paint8_linear_312_1615)" stroke-opacity="0.19" stroke-width="5" stroke-miterlimit="10" />
            <path d="M1504.85 391.349C1547.78 635.424 2093.2 503.946 2246.35 315.421C2437.89 79.7806 1990.6 -250.59 2027.21 -440.721C2042.77 -521.541 1753.79 -348.191 1478.23 -242.445C1202.68 -136.699 992.649 -68.2511 1152.82 -3.76443C1259.94 39.3195 1450.39 81.6299 1504.85 391.349Z" stroke="url(#paint9_linear_312_1615)" stroke-opacity="0.19" stroke-width="5" stroke-miterlimit="10" />
            <path d="M1500.44 418.922C1541.64 677.734 2118.25 535.242 2278.48 335.462C2479.46 84.9131 1999.28 -255.257 2042.89 -459.326C2061.29 -545.349 1750.06 -376.238 1458.94 -260.986C1168.85 -146.114 944.31 -58.2435 1121.19 9.94077C1240.05 55.7404 1448.03 89.7246 1500.44 418.922Z" stroke="url(#paint10_linear_312_1615)" stroke-opacity="0.19" stroke-width="5" stroke-miterlimit="10" />
            <path d="M1496.03 446.5C1535.5 720.048 2143.03 566.197 2310.58 355.411C2520.31 89.6375 2007.68 -260.001 2058.51 -478.018C2079.78 -569.251 1746.31 -404.378 1439.63 -279.595C1134.68 -155.513 895.928 -48.2979 1089.46 23.5725C1220.16 72.1661 1445.75 97.86 1496.03 446.5Z" stroke="url(#paint11_linear_312_1615)" stroke-opacity="0.19" stroke-width="5" stroke-miterlimit="10" />
            <path d="M1491.64 474.064C1529.38 762.349 2168.21 597.482 2342.68 375.513C2561.89 94.897 2016.08 -264.592 2074.15 -496.564C2098.24 -593.048 1742.54 -432.365 1420.26 -298.038C1100.43 -164.763 847.534 -38.1992 1057.67 37.3705C1200.27 88.5847 1443.42 105.97 1491.64 474.064Z" stroke="url(#paint12_linear_312_1615)" stroke-opacity="0.19" stroke-width="5" stroke-miterlimit="10" />
            <path d="M1487.22 501.638C1523.29 804.775 2193.42 628.789 2374.82 395.524C2603.22 100.145 2024.73 -269.381 2089.84 -515.2C2116.78 -617.047 1738.62 -461.018 1401.04 -316.598C1066.12 -174.68 799.293 -28.217 1026.08 51.0389C1180.41 105 1441.13 114.102 1487.22 501.638Z" stroke="url(#paint13_linear_312_1615)" stroke-opacity="0.19" stroke-width="5" stroke-miterlimit="10" />
            <path d="M-560.995 1354.34C-524.929 1657.48 145.203 1481.5 326.606 1248.23C555.003 952.852 -23.4905 583.325 41.6248 337.507C68.5626 235.66 -309.598 391.688 -647.182 536.109C-982.098 678.026 -1248.93 824.49 -1022.13 903.745C-867.808 957.706 -607.085 966.808 -560.995 1354.34Z" stroke="url(#paint14_linear_312_1615)" stroke-opacity="0.19" stroke-width="5" stroke-miterlimit="10" />
            <path d="M-593.995 1398.34C-557.929 1701.48 112.203 1525.5 293.606 1292.23C522.003 996.852 -56.4905 627.326 8.62475 381.507C35.5626 279.66 -342.598 435.689 -680.182 580.109C-1015.1 722.027 -1281.93 868.49 -1055.13 947.746C-900.808 1001.71 -640.085 1010.81 -593.995 1398.34Z" stroke="url(#paint15_linear_312_1615)" stroke-opacity="0.19" stroke-width="5" stroke-miterlimit="10" />
            <path d="M-647.995 1425.35C-611.929 1728.48 58.2029 1552.5 239.606 1319.23C468.003 1023.85 -110.491 654.326 -45.3752 408.507C-18.4374 306.661 -396.598 462.689 -734.182 607.109C-1069.1 749.027 -1335.93 895.49 -1109.13 974.746C-954.808 1028.71 -694.085 1037.81 -647.995 1425.35Z" stroke="url(#paint16_linear_312_1615)" stroke-opacity="0.19" stroke-width="5" stroke-miterlimit="10" />
            <path d="M-712.995 1425.35C-676.929 1728.48 -6.79708 1552.5 174.606 1319.23C403.003 1023.85 -175.491 654.326 -110.375 408.508C-83.4374 306.661 -461.598 462.689 -799.182 607.109C-1134.1 749.027 -1400.93 895.491 -1174.13 974.746C-1019.81 1028.71 -759.085 1037.81 -712.995 1425.35Z" stroke="url(#paint17_linear_312_1615)" stroke-opacity="0.19" stroke-width="5" stroke-miterlimit="10" />
            <path d="M-768.997 1425.35C-732.931 1728.48 -62.799 1552.5 118.604 1319.23C347.001 1023.85 -231.492 654.327 -166.377 408.508C-139.439 306.661 -517.6 462.69 -855.184 607.11C-1190.1 749.028 -1456.93 895.491 -1230.14 974.747C-1075.81 1028.71 -815.087 1037.81 -768.997 1425.35Z" stroke="url(#paint18_linear_312_1615)" stroke-opacity="0.19" stroke-width="5" stroke-miterlimit="10" />
            <path d="M-824.996 1425.35C-788.93 1728.48 -118.798 1552.5 62.6049 1319.23C291.002 1023.85 -287.491 654.327 -222.376 408.508C-195.438 306.661 -573.599 462.69 -911.183 607.11C-1246.1 749.028 -1512.93 895.491 -1286.13 974.747C-1131.81 1028.71 -871.086 1037.81 -824.996 1425.35Z" stroke="url(#paint19_linear_312_1615)" stroke-opacity="0.19" stroke-width="5" stroke-miterlimit="10" />
            <path d="M1482.81 529.21C1517.71 846.932 2218.63 660.093 2406.95 415.54C2644.88 105.306 2033.22 -274.182 2105.51 -533.856C2135.29 -640.856 1734.92 -488.969 1381.74 -335.165C1032 -183.913 751.003 -18.2238 994.382 64.7625C1160.55 121.413 1439.56 122.145 1482.81 529.21Z" stroke="url(#paint20_linear_312_1615)" stroke-opacity="0.19" stroke-width="5" stroke-miterlimit="10" />
            <path d="M1478.42 556.781C1511.47 889.273 2243.81 691.362 2439.07 435.563C2686.39 110.537 2041.68 -278.994 2121.18 -552.48C2153.81 -664.764 1731.16 -516.923 1362.44 -353.7C997.878 -193.139 702.683 -8.24177 962.698 78.4617C1140.83 137.873 1437.11 130.296 1478.42 556.781Z" stroke="url(#paint21_linear_312_1615)" stroke-opacity="0.19" stroke-width="5" stroke-miterlimit="10" />
            <path d="M1474.01 584.354C1505.23 931.608 2269.02 722.692 2471.17 455.586C2727.82 115.757 2050.15 -283.868 2136.82 -571.105C2172.31 -688.702 1727.49 -545.04 1343.22 -372.261C963.862 -202.269 654.301 2.19726 931.061 92.142C1120.73 154.587 1434.65 138.448 1474.01 584.354Z" stroke="url(#paint22_linear_312_1615)" stroke-opacity="0.19" stroke-width="5" stroke-miterlimit="10" />
            <path d="M1469.59 611.925C1498.91 973.962 2294.28 754.062 2503.29 475.601C2769.4 120.937 2058.63 -288.743 2152.39 -589.71C2190.74 -712.646 1723.71 -572.866 1323.75 -390.782C929.609 -211.599 606.025 11.9494 899.277 105.86C1100.95 170.819 1432.29 146.516 1469.59 611.925Z" stroke="url(#paint23_linear_312_1615)" stroke-opacity="0.19" stroke-width="5" stroke-miterlimit="10" />
            <path d="M867.6 119.581C1081.14 187.062 1429.74 154.77 1465.2 639.494C1492.75 1016.31 2319.42 785.31 2535.42 495.646C2810.93 126.134 2067.1 -293.614 2168.13 -608.358C2249.87 -862.887 243.089 -77.7448 867.6 119.581Z" stroke="url(#paint24_linear_312_1615)" stroke-opacity="0.19" stroke-width="5" stroke-miterlimit="10" />
        </g>
        <defs>
            <linearGradient id="paint0_linear_312_1615" x1="1510.87" y1="293.302" x2="1418.05" y2="-256.378" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D7B257" stop-opacity="0.79" />
                <stop offset="1" stop-color="#715E2E" stop-opacity="0.28" />
            </linearGradient>
            <linearGradient id="paint1_linear_312_1615" x1="1483.49" y1="336.996" x2="1379.95" y2="-273.748" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D7B257" stop-opacity="0.79" />
                <stop offset="1" stop-color="#715E2E" stop-opacity="0.28" />
            </linearGradient>
            <linearGradient id="paint2_linear_312_1615" x1="1451.78" y1="382.01" x2="1337.67" y2="-290.386" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D7B257" stop-opacity="0.79" />
                <stop offset="1" stop-color="#715E2E" stop-opacity="0.28" />
            </linearGradient>
            <linearGradient id="paint3_linear_312_1615" x1="1418.67" y1="427.543" x2="1293.21" y2="-306.525" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D7B257" stop-opacity="0.79" />
                <stop offset="1" stop-color="#715E2E" stop-opacity="0.28" />
            </linearGradient>
            <linearGradient id="paint4_linear_312_1615" x1="1385.41" y1="473.2" x2="1248.55" y2="-323.028" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D7B257" stop-opacity="0.79" />
                <stop offset="1" stop-color="#715E2E" stop-opacity="0.28" />
            </linearGradient>
            <linearGradient id="paint5_linear_312_1615" x1="1352.05" y1="519.033" x2="1203.72" y2="-339.952" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D7B257" stop-opacity="0.79" />
                <stop offset="1" stop-color="#715E2E" stop-opacity="0.28" />
            </linearGradient>
            <linearGradient id="paint6_linear_312_1615" x1="1318.56" y1="564.986" x2="1158.71" y2="-357.305" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D7B257" stop-opacity="0.79" />
                <stop offset="1" stop-color="#715E2E" stop-opacity="0.28" />
            </linearGradient>
            <linearGradient id="paint7_linear_312_1615" x1="1285.07" y1="610.97" x2="1113.63" y2="-375.156" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D7B257" stop-opacity="0.79" />
                <stop offset="1" stop-color="#715E2E" stop-opacity="0.28" />
            </linearGradient>
            <linearGradient id="paint8_linear_312_1615" x1="1251.45" y1="657.005" x2="1068.38" y2="-393.485" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D7B257" stop-opacity="0.79" />
                <stop offset="1" stop-color="#715E2E" stop-opacity="0.28" />
            </linearGradient>
            <linearGradient id="paint9_linear_312_1615" x1="1217.87" y1="703.118" x2="1023.1" y2="-412.462" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D7B257" stop-opacity="0.79" />
                <stop offset="1" stop-color="#715E2E" stop-opacity="0.28" />
            </linearGradient>
            <linearGradient id="paint10_linear_312_1615" x1="1184.37" y1="749.262" x2="977.838" y2="-432.022" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D7B257" stop-opacity="0.79" />
                <stop offset="1" stop-color="#715E2E" stop-opacity="0.28" />
            </linearGradient>
            <linearGradient id="paint11_linear_312_1615" x1="1150.73" y1="795.286" x2="932.41" y2="-452.254" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D7B257" stop-opacity="0.79" />
                <stop offset="1" stop-color="#715E2E" stop-opacity="0.28" />
            </linearGradient>
            <linearGradient id="paint12_linear_312_1615" x1="1117.04" y1="841.575" x2="886.822" y2="-472.998" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D7B257" stop-opacity="0.79" />
                <stop offset="1" stop-color="#715E2E" stop-opacity="0.28" />
            </linearGradient>
            <linearGradient id="paint13_linear_312_1615" x1="1083.54" y1="887.889" x2="841.359" y2="-494.804" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D7B257" stop-opacity="0.79" />
                <stop offset="1" stop-color="#715E2E" stop-opacity="0.28" />
            </linearGradient>
            <linearGradient id="paint14_linear_312_1615" x1="-964.677" y1="1740.6" x2="-1206.86" y2="357.902" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D7B257" stop-opacity="0.79" />
                <stop offset="1" stop-color="#715E2E" stop-opacity="0.28" />
            </linearGradient>
            <linearGradient id="paint15_linear_312_1615" x1="-997.677" y1="1784.6" x2="-1239.86" y2="401.902" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D7B257" stop-opacity="0.79" />
                <stop offset="1" stop-color="#715E2E" stop-opacity="0.28" />
            </linearGradient>
            <linearGradient id="paint16_linear_312_1615" x1="-1051.68" y1="1811.6" x2="-1293.86" y2="428.903" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D7B257" stop-opacity="0.79" />
                <stop offset="1" stop-color="#715E2E" stop-opacity="0.28" />
            </linearGradient>
            <linearGradient id="paint17_linear_312_1615" x1="-1116.68" y1="1811.6" x2="-1358.86" y2="428.903" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D7B257" stop-opacity="0.79" />
                <stop offset="1" stop-color="#715E2E" stop-opacity="0.28" />
            </linearGradient>
            <linearGradient id="paint18_linear_312_1615" x1="-1172.68" y1="1811.6" x2="-1414.86" y2="428.903" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D7B257" stop-opacity="0.79" />
                <stop offset="1" stop-color="#715E2E" stop-opacity="0.28" />
            </linearGradient>
            <linearGradient id="paint19_linear_312_1615" x1="-1228.68" y1="1811.6" x2="-1470.86" y2="428.903" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D7B257" stop-opacity="0.79" />
                <stop offset="1" stop-color="#715E2E" stop-opacity="0.28" />
            </linearGradient>
            <linearGradient id="paint20_linear_312_1615" x1="1049.94" y1="934.211" x2="795.74" y2="-516.883" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D7B257" stop-opacity="0.79" />
                <stop offset="1" stop-color="#715E2E" stop-opacity="0.28" />
            </linearGradient>
            <linearGradient id="paint21_linear_312_1615" x1="1016.32" y1="980.545" x2="750.064" y2="-539.593" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D7B257" stop-opacity="0.79" />
                <stop offset="1" stop-color="#715E2E" stop-opacity="0.28" />
            </linearGradient>
            <linearGradient id="paint22_linear_312_1615" x1="982.677" y1="1026.94" x2="704.291" y2="-562.917" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D7B257" stop-opacity="0.79" />
                <stop offset="1" stop-color="#715E2E" stop-opacity="0.28" />
            </linearGradient>
            <linearGradient id="paint23_linear_312_1615" x1="949.046" y1="1073.37" x2="658.49" y2="-586.637" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D7B257" stop-opacity="0.79" />
                <stop offset="1" stop-color="#715E2E" stop-opacity="0.28" />
            </linearGradient>
            <linearGradient id="paint24_linear_312_1615" x1="915.492" y1="1119.75" x2="612.737" y2="-610.834" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D7B257" stop-opacity="0.79" />
                <stop offset="1" stop-color="#715E2E" stop-opacity="0.28" />
            </linearGradient>
        </defs>
    </svg>`

const ClientStock = () => {
    return (
        <div 
        style={{ 
            backgroundImage: `url("data:image/svg+xml;base64,${btoa(Curve)}")`,
            // backgroundSize: 'cover',
            // backgroundPosition: 'center'
        }}
        className='flex flex-col w-full min-h-screen '>
            <NavbarSecond />
            <main className='flex-grow mt-24'>
                <StockDashboard />
            </main>
        </div>
    );
}

export default ClientStock;
