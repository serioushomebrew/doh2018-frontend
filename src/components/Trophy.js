import React from "react";

const SvgComponent = props => (
  <svg width={28} height={23} viewBox="0 0 28 23" {...props}>
    <title>Shape</title>
    <path
      d="M22.606 1.953c.018-.828-.014-1.35-.014-1.35L14.505.595h-.082L6.335.602s-.03.523-.013 1.35H.964v.884c0 .202.034 4.959 2.97 7.565 1.225 1.086 2.752 1.633 4.553 1.634.273 0 .553-.018.837-.043 1.023 1.401 2.205 2.382 3.535 2.871v3.88H8.955v2.431H7.666v1.363h13.596v-1.362h-1.29v-2.43h-3.903v-3.88c1.328-.49 2.511-1.47 3.534-2.872.286.024.566.042.838.042 1.8-.002 3.328-.548 4.553-1.635 2.936-2.606 2.97-7.363 2.97-7.565v-.882h-5.358zM5.112 9.083C3.435 7.6 2.94 5.06 2.792 3.72h3.63c.154 1.668.516 3.746 1.35 5.574.152.335.313.653.477.963C7 10.21 5.945 9.82 5.112 9.083zm18.704 0c-.832.737-1.886 1.126-3.136 1.174.164-.31.324-.628.477-.963.834-1.828 1.195-3.906 1.348-5.574h3.63c-.147 1.338-.642 3.878-2.32 5.363z"
      fillRule="nonzero"
      fill={props.color}
    />
  </svg>
);

export default SvgComponent;
