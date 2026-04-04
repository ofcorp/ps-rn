import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const EditIcon = () => (
  <Svg width={14} height={14} fill="none">
    <Path
      stroke="#DDD"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.704 1.627H4.523c-1.794 0-2.919 1.27-2.919 3.068v4.85c0 1.797 1.12 3.067 2.919 3.067H9.67c1.8 0 2.92-1.27 2.92-3.067v-2.35"
    />
    <Path
      stroke="#DDD"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m5.15 6.37 4.359-4.359a1.391 1.391 0 0 1 1.966 0l.71.71a1.39 1.39 0 0 1 0 1.967l-4.38 4.38c-.238.237-.56.37-.896.37H4.724l.055-2.204c.008-.324.14-.634.37-.863Z"
      clipRule="evenodd"
    />
    <Path stroke="#DDD" strokeLinecap="round" strokeLinejoin="round" d="m8.846 2.685 2.664 2.663" />
  </Svg>
);
export default EditIcon;
