import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';
import { createElement, Fragment, useEffect, useRef, useState } from 'react';
import algoliasearch from 'algoliasearch';
import { AutoCompleteWrapperProps, IAutocompleteProps } from './types';
import { createPortal } from 'react-dom';

export const Autocomplete = ({
    portalId,
    isSuggestionsVisible,
    ...otherProps
}: IAutocompleteProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [childrenElements, setChildrenElements] =
        useState<JSX.Element | null>(null);

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        const search = autocomplete({
            ...otherProps,
            container: containerRef.current,
            renderer: { createElement, Fragment, render: () => {} },
            render: ({ children }, root) => {
                if (isSuggestionsVisible) {
                    setChildrenElements(<Fragment>{children}</Fragment>);
                } else {
                    setChildrenElements(null);
                }
            },
        });

        return () => {
            search.destroy();
        };
    }, [isSuggestionsVisible]);

    return (
        <div ref={containerRef}>
            <div id={portalId}></div>
            {isSuggestionsVisible &&
            portalId &&
            document.getElementById(portalId) &&
            childrenElements
                ? createPortal(
                      childrenElements,
                      document.getElementById(portalId)!
                  )
                : null}
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
            placeholder={`Search for ${attributeName}`}
            getSources={({
                query,
                refresh,
                setQuery,
                setIsOpen,
            }: {
                query?: any;
                refresh?: any;
                setQuery?: any;
                setIsOpen?: any;
            }) => {
                return [
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
                                transformResponse({ hits }) {
                                    const data = hits[0];
                                    return data.filter((item: any) =>
                                        item.hasOwnProperty(
                                            attributeName.toLowerCase()
                                        )
                                    );
                                },
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
                                                refresh();
                                                onHandleSuggestionsVisible(
                                                    portalId,
                                                    false
                                                );
                                            }}
                                        >
                                            Select option
                                        </button>
                                    </div>
                                );
                            },
                        },
                    },
                ];
            }}
        />
    );
};
