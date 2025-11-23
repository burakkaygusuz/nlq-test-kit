import z from 'zod';

const EnvSchema = z.object({
  GEMINI_API_KEY: z.string().min(1),
  GEMINI_MODEL: z.string().min(1).default('gemini-2.5-flash')
});

export type Env = z.infer<typeof EnvSchema>;

const validateEnv = async () => {
  const env = await EnvSchema.safeParseAsync(process.env);

  if (!env.success) {
    console.error('Failed to parse environment variables:', z.treeifyError(env.error));
    process.exit(1);
  }

  return env.data;
};

const env = await validateEnv();
export default env;
