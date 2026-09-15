ALTER TABLE "notes"
ADD COLUMN IF NOT EXISTS "outputType" VARCHAR(5);

DO $$
BEGIN
	IF NOT EXISTS (
		SELECT 1
		FROM pg_constraint
		WHERE conname = 'notes_outputType_check'
	) THEN
		ALTER TABLE "notes"
		ADD CONSTRAINT "notes_outputType_check"
		CHECK ("outputType" IS NULL OR "outputType" IN ('brief', 'deep'));
	END IF;
END $$;