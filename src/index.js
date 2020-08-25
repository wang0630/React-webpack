import React from 'react';
import ReactDom from 'react-dom';
import InnerImage from './components/Inner-image';
import CountExample from './components/count-example';

function Root() {
  return (
    <div>
      {/* <InnerImage /> */}
      <CountExample />
    </div>
  );
}

ReactDom.render(<Root />, document.getElementById('root'));
