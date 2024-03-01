import SchemaBuilder from '@pothos/core';

const builder = new SchemaBuilder<{
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
  };
}>({
  notStrict:
    'Pothos may not work correctly when strict mode is not enabled in tsconfig.json',
  plugins: [],
});

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      args: {
        name: t.arg.string(),
      },
      resolve: (parent, { name }) => `hello, ${name || 'World'}`,
    }),
  }),
});

export const schema = builder.toSchema();
