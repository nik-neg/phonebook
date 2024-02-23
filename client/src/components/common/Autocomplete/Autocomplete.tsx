import {
    autocomplete,
    getAlgoliaResults,
    OnStateChangeProps,
} from '@algolia/autocomplete-js';
import { createElement, Fragment, useEffect, useRef } from 'react';
import { createRoot, Root } from 'react-dom/client';
import algoliasearch from 'algoliasearch';
import { AutoCompleteWrapperProps, IAutocompleteProps } from './types';
import { createPortal } from 'react-dom';

export const Autocomplete = ({
    portalId,
    isSuggestionsVisible,
    onHandleSuggestionsVisible,
    ...otherProps
}: IAutocompleteProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const panelRootRef = useRef<Root | null>(null); // Ref to store the root

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        const search = autocomplete({
            ...otherProps,
            container: containerRef.current,
            renderer: { createElement, Fragment, render: () => {} },
            onStateChange: (props: OnStateChangeProps<any>) => {
                // console.log({ props });
                onHandleSuggestionsVisible(true);
            },
            render: ({ children }, root) => {
                if (isSuggestionsVisible) {
                    const portalRoot = document.getElementById(portalId);
                    if (portalRoot) {
                        // Create the root only if it doesn't already exist
                        if (!panelRootRef.current) {
                            panelRootRef.current = createRoot(portalRoot);
                        }
                        // Use the existing root's render method
                        panelRootRef.current.render(
                            createPortal(children, portalRoot)
                        );
                    }
                } else {
                    panelRootRef.current?.unmount();
                }
            },
        });

        return () => {
            search.destroy();
            panelRootRef.current?.unmount();
        };
    }, [otherProps, isSuggestionsVisible]);

    return (
        <div ref={containerRef}>
            <div id={portalId} onClick={() => console.log({ portalId })}></div>
        </div>
    );
};

const appId = import.meta.env.VITE_APP_ID as string;
const apiKey = import.meta.env.VITE_API_KEY as string;
const searchClient = algoliasearch(appId, apiKey);

export const AutoCompleteWrapper = ({
    portalId,
    isSuggestionsVisible,
    onHandleSuggestionsVisible,
    attributeName,
    formFieldName,
    handleSetValue,
}: AutoCompleteWrapperProps) => {
    return (
        <Autocomplete
            portalId={portalId}
            isSuggestionsVisible={isSuggestionsVisible}
            onHandleSuggestionsVisible={onHandleSuggestionsVisible}
            // openOnFocus={true}
            // onFocus={() => onHandleSuggestionsVisible(true)}
            // onBlur={() => onHandleSuggestionsVisible(false)}
            onClick={() =>
                console.log({ portalId, label: 'AutoCompleteWrapper' })
            }
            placeholder={`Search for ${attributeName}`}
            getSources={({
                query,
                refresh,
                setQuery,
                setIsOpen,
            }: {
                query: any;
                refresh: any;
                setQuery: any;
                setIsOpen: any;
                setCollections: any;
            }) => [
                {
                    sourceId: attributeName,
                    getItems() {
                        return getAlgoliaResults({
                            searchClient,
                            queries: [
                                {
                                    indexName: 'phonebook',
                                    query,
                                },
                            ],
                        });
                    },
                    templates: {
                        item({
                            item,
                            components,
                        }: {
                            item: any;
                            components: any;
                        }) {
                            console.log({ item });
                            return (
                                <div className="aa-ItemContent">
                                    <div
                                        className="aa-ItemTitle"
                                        style={{
                                            width: '100px',
                                        }}
                                    >
                                        <components.Highlight
                                            hit={item}
                                            attribute={attributeName}
                                        />
                                    </div>
                                    <button
                                        className="aa-ItemActionButton"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            setQuery(item[attributeName]);
                                            handleSetValue(
                                                formFieldName,
                                                item[attributeName]
                                            );
                                            setIsOpen(false);
                                            onHandleSuggestionsVisible(false);
                                            refresh();
                                        }}
                                    >
                                        Select option
                                    </button>
                                </div>
                            );
                        },
                    },
                },
            ]}
        />
    );
};
