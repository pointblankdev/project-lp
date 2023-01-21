import Script from 'next/script';
import { FunctionComponent } from 'react';

const ClearbitVisitorReport: FunctionComponent = () => {
  return (
    <Script
      async
      src="https://tag.clearbitscripts.com/v1/pk_70fd662a3f4bdc78e362dc0d76f1e234/tags.js"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
};

export default ClearbitVisitorReport;
