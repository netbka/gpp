-- AlterTable
ALTER TABLE "auth"."users" ADD COLUMN     "is_anonymous" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "auth"."flow_state" ADD COLUMN     "auth_code_issued_at" TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "auth"."saml_providers" ADD COLUMN     "name_id_format" TEXT;

-- AlterTable
ALTER TABLE "auth"."saml_relay_states" DROP COLUMN "from_ip_address";

-- CreateIndex
CREATE INDEX "users_is_anonymous_idx" ON "auth"."users"("is_anonymous");

