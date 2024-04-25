import React, { useEffect } from 'react';
import {useDropzone} from 'react-dropzone';
import uploadFile from '../utils/uploadFile';

function DropzoneOneFile({setAvatar}) {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    maxFiles: 1,
  });

    useEffect(() => {
        if (acceptedFiles[0]) {
            uploadFile(acceptedFiles[0])
            .then(res => res.json())
            .then(data => {
                setAvatar(data);
            })
        }
    }, [acceptedFiles]);
  
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Перетягніть файл аба натисніть для додавання фото</p>
      </div>
      <aside>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}


export default DropzoneOneFile