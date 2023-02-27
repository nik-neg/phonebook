import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { BiCloudUpload } from 'react-icons/all';
import { Button } from '@mui/material';

export const UploadButton = (): JSX.Element => {
    const onDrop = useCallback((acceptedFiles) => {
        console.log({ acceptedFiles });
        // Do something with the files
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] },
        onDrop,
    });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Button variant="contained">
                {'Upload Image'}
                <BiCloudUpload size={'1.5rem'} />
            </Button>
        </div>
    );
};
