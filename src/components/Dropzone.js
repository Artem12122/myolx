import React, { useEffect } from 'react';
import {useDropzone} from 'react-dropzone';
import uploadFile from '../utils/uploadFile';

function Basic(props) {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();

  useEffect(() => {
    console.log(acceptedFiles);

    if (acceptedFiles[0]) {
        uploadFile(acceptedFiles[0])
    }
  }, [acceptedFiles])
  
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}


export default Basic