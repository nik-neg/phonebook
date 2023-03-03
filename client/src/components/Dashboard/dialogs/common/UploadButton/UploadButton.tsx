import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { BiCloudUpload } from 'react-icons/all';
import { Button } from '@mui/material';
import { SUploadButtonWrapper } from './UploadButton.styles';
import { IUploadButtonProps } from './types';

export const UploadButton = ({ onUpload }: IUploadButtonProps): JSX.Element => {
    const onDrop = useCallback((acceptedFiles: any[]) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.onload = (e) => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result ?? '';
                // Do whatever you want with the file contents
                onUpload(e.target?.result ?? '');
            };
            reader.readAsDataURL(file);
        });

        // Do something with the files
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] },
        onDrop,
    });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <SUploadButtonWrapper>
                <Button variant="contained">
                    {'Upload Image'}
                    <BiCloudUpload size={'1.5rem'} />
                </Button>
            </SUploadButtonWrapper>
        </div>
    );
};
