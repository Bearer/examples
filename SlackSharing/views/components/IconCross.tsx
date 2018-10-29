export default ({ height }: { height?: string }) => (
  <svg
    version="1.1"
    height={height || '1em'}
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 25 25"
  >
    <style type="text/css">
      {' '}
      .path
        {`{stroke-width: 1px;`}{' '}
      {`stroke-linejoin: round;`}{' '}
      {`stroke: currentColor;}`}{' '}
    </style>
    <g>
      <path fill="currentColor" className="path" d="M18.8535,17.1465a.5.5,0,0,1-.707.707L12.5,12.207,6.8535,17.8535a.5.5,0,0,1-.707-.707L11.793,11.5,6.1465,5.8535a.5.5,0,1,1,.707-.707L12.5,10.793l5.6465-5.6465a.5.5,0,1,1,.707.707L13.207,11.5Z" />
    </g>
  </svg>
)
