import * as React from 'react';
import Svg, { G, Circle, Path, Defs, ClipPath } from 'react-native-svg';

const GeoIcon = () => (
  <Svg width={18} height={18} fill="none">
    <G stroke="#fff" strokeWidth={1.5} clipPath="url(#a)">
      <Circle cx={9} cy={9} r={7.5} />
      <Path d="M9.768 10.92c-1.732.693-2.599 1.04-3.093.703a1.125 1.125 0 0 1-.298-.298c-.337-.495.01-1.36.703-3.093.148-.37.221-.554.349-.7.032-.036.067-.071.104-.103.145-.128.33-.201.699-.35 1.732-.692 2.598-1.039 3.093-.702.117.08.219.18.298.298.337.494-.01 1.36-.703 3.093-.148.37-.222.554-.349.7a1.136 1.136 0 0 1-.104.103c-.145.127-.33.201-.699.35Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h18v18H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default GeoIcon;
