import {
    SAddress,
    SContactCardContainer,
    SContactCardWrapper,
    SContactInfoWrapper,
    SContactName,
    SDetailsWrapper,
} from '../ContactCard.styles';
import React from 'react';
import { Skeleton } from '@mui/material';
import { SContactCardSkeletonContainer } from './SContactCardSkeleton.styles';

export const ContactCardSkeleton = () => {
    return (
        <SContactCardContainer>
            <SContactCardWrapper isSkeleton>
                <SContactInfoWrapper>
                    <Skeleton variant="circular" width={75} height={75} />
                    <SDetailsWrapper>
                        <SAddress>
                            <SContactCardSkeletonContainer
                                justifyContent={'flex-end'}
                            >
                                <Skeleton
                                    variant="text"
                                    sx={{ fontSize: '1rem', width: '60%' }}
                                />
                            </SContactCardSkeletonContainer>
                        </SAddress>
                        <SContactName>
                            <SContactCardSkeletonContainer
                                justifyContent={'flex-start'}
                            >
                                <Skeleton
                                    variant="text"
                                    sx={{ fontSize: '1rem', width: '60%' }}
                                />
                            </SContactCardSkeletonContainer>
                        </SContactName>
                    </SDetailsWrapper>
                </SContactInfoWrapper>
            </SContactCardWrapper>
        </SContactCardContainer>
    );
};
