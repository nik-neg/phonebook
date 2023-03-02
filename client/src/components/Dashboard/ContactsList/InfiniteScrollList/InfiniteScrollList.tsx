import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface ListItem {
    id: number;
    name: string;
}

const debounce = <T extends any[]>(
    func: (...args: T) => void,
    wait: number
) => {
    let timeout: ReturnType<typeof setTimeout>;
    return function executedFunction(...args: T) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const fetchData = async () => {
    // Fetch data here and set it to the state
};

const StyledList = styled.ul`
    /* Styling for the list container */
`;

const StyledListItem = styled.li`
    /* Styling for the list item */
`;

export const InfiniteScrollList = (): JSX.Element => {
    const [listData, setListData] = useState<ListItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollTargetRef = useRef<HTMLDivElement>(null);

    const handleIntersection = debounce(
        async ([entry]: IntersectionObserverEntry[]) => {
            const { isIntersecting } = entry;
            if (isIntersecting) {
                await fetchData();
            }
        },
        500
    );

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        };

        const observer = new IntersectionObserver(handleIntersection, options);

        if (scrollTargetRef.current) {
            observer.observe(scrollTargetRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <StyledList>
                {listData.map((item) => (
                    <StyledListItem key={item.id}>
                        {/* Render the list item */}
                    </StyledListItem>
                ))}
            </StyledList>
            {isLoading && <p>Loading...</p>}
            <div ref={scrollTargetRef} />
        </>
    );
};
