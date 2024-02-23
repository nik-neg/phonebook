import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';
import { createElement, Fragment, useEffect, useRef } from 'react';
import { createRoot, Root } from 'react-dom/client';
import algoliasearch from 'algoliasearch';
import { AutoCompleteWrapperProps } from './types';
import TextField from '@mui/material/TextField';

export const Autocomplete = (props: any) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const panelRootRef = useRef<Root | null>(null);
    let rootRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        const search = autocomplete({
            debug: true,
            container: containerRef.current,
            renderer: { createElement, Fragment, render: () => {} },
            render: function ({ children }, root) {
                if (!panelRootRef.current || rootRef.current !== root) {
                    rootRef.current = root;

                    if (panelRootRef.current) {
                        panelRootRef.current.unmount();
                    }

                    panelRootRef.current = createRoot(root);
                }

                panelRootRef.current?.render(children);
            },
            onSubmit: function ({ state }) {
                console.log(state);
            },

            ...props,
        });

        search?.setActiveItemId(1);

        return () => {
            search.destroy();
        };
    }, [props]);

    return <div ref={containerRef} />;
};

const appId = import.meta.env.VITE_APP_ID as string;
const apiKey = import.meta.env.VITE_API_KEY as string;
const searchClient = algoliasearch(appId, apiKey);

export const AutoCompleteWrapper = ({
    attributeName,
    formFieldName,
    register,
    handleSetValue,
}: AutoCompleteWrapperProps) => {
    return (
        <Autocomplete
            insights={true}
            openOnFocus={true}
            placeholder="Search for a firstname"
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
                            return (
                                <div
                                    className="aa-ItemContent"
                                    style={{
                                        zIndex: 999,
                                        backgroundColor: 'white',
                                    }}
                                >
                                    <TextField
                                        autoFocus
                                        autoComplete={'given-name'}
                                        margin="dense"
                                        id="name"
                                        label="First Name"
                                        fullWidth
                                        variant="standard"
                                        {...register}
                                    />
                                    <div
                                        className="aa-ItemTitle"
                                        style={{ width: '100px' }}
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
                                        }}
                                    >
                                        Choose firstname
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
