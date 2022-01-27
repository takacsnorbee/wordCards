// Loading screen component

Vue.component('loading-screen', {
    template: `
    <div id="loader-container-wrapper" @click.prevent.stop="">
      <div id="loader-container">
        <svg width="1074" height="566" viewBox="0 0 1074 566" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="634" y="218" width="84.0263" height="129.978" rx="15" fill="#0CB34F"/>
          <path
            d="M674.989 268.728C679.693 268.728 683.341 270.024 685.933 272.616C688.557 275.176 689.869 278.76 689.869 283.368C689.869 
            287.624 688.589 290.968 686.029 293.4C683.501 295.8 679.949 297 675.373 297H662.029V292.728H666.253V273H662.029V268.728H674.989ZM674.509 
            292.728C677.869 292.728 680.413 291.944 682.141 290.376C683.869 288.776 684.733 286.44 684.733 283.368C684.733 279.944 683.901 277.368 
            682.237 275.64C680.605 273.88 678.189 273 674.989 273H671.197V292.728H674.509Z"
            fill="white"
          />
          <rect x="541" y="218" width="84.0263" height="129.978" rx="15" fill="#0CB34F"/>
          <path
            d="M569.967 297V292.728H574.143V273H569.967V268.728H582.639C585.455 268.728 587.647 269.08 589.215 269.784C590.815 270.488 
            591.935 271.512 592.575 272.856C593.215 274.2 593.535 275.832 593.535 277.752C593.535 280.728 592.735 282.984 591.135 284.52C589.535 
            286.024 586.927 286.776 583.311 286.776H579.087V292.728H581.775V297H569.967ZM579.135 282.504H582.543C583.887 282.504 584.991 282.376 
            585.855 282.12C586.719 281.864 587.359 281.4 587.775 280.728C588.191 280.024 588.399 279.032 588.399 277.752C588.399 276.472 588.175 
            275.496 587.727 274.824C587.279 274.12 586.607 273.64 585.711 273.384C584.847 273.128 583.791 273 582.543 273H579.135V282.504ZM588.783 
            297L582.975 286.344L587.727 285.624L591.951 292.728H596.607V297H588.783Z"
            fill="white"
          />
          <rect x="448" y="218" width="84.0263" height="129.978" rx="15" fill="#0CB34F"/>
          <path
            d="M489.946 267.864C492.666 267.864 495.05 268.472 497.098 269.688C499.178 270.872 500.794 272.584 501.946 274.824C503.098 
            277.032 503.674 279.704 503.674 282.84C503.674 285.944 503.098 288.616 501.946 290.856C500.794 293.096 499.194 294.824 497.146 
            296.04C495.098 297.256 492.714 297.864 489.994 297.864C487.306 297.864 484.922 297.256 482.842 296.04C480.794 294.824 479.194 293.096 
            478.042 290.856C476.89 288.616 476.314 285.944 476.314 282.84C476.314 279.704 476.89 277.032 478.042 274.824C479.194 272.584 480.794 
            270.872 482.842 269.688C484.89 268.472 487.258 267.864 489.946 267.864ZM489.994 272.04C487.242 272.04 485.13 272.984 483.658 274.872C482.186 
            276.728 481.45 279.384 481.45 282.84C481.45 286.328 482.186 289.016 483.658 290.904C485.13 292.76 487.242 293.688 489.994 293.688C492.746 293.688 
            494.858 292.76 496.33 290.904C497.802 289.016 498.538 286.328 498.538 282.84C498.538 279.384 497.802 276.728 496.33 274.872C494.858 272.984 492.746 272.04 489.994 272.04Z"
            fill="white"
          />
          <rect x="355" y="218" width="84.0263" height="129.978" rx="15" fill="#0CB34F"
          />
          <path
            d="M375.497 268.728H387.977V273H385.193L388.505 285.192L390.185 291.768L391.481 285.336L395.129 272.328H400.937L404.297 
            285.144L405.641 291.768L407.225 285.144L410.777 273H407.753V268.728H419.561V273H415.673L408.089 297H402.377L399.305 284.184L397.865 
            277.944L396.185 284.184L392.921 297H387.353L379.769 273H375.497V268.728Z"
            fill="white"
          />
        </svg>
      </div>
      <div id="loader-text" >Loading...</div>
    </div>  
    `
})