import React from 'react';

export default class AdComponent extends React.Component {
  componentDidMount () {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

render () {
    return (
        <ins class="adsbygoogle"
     style={{display:'block'}}
     data-ad-client="ca-pub-9214745121817359"
     data-ad-slot="2961632342"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
    );
  }
}