CREATE TYPE "public"."role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"role" "role" DEFAULT 'user' NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "comment" (
	"id" text PRIMARY KEY NOT NULL,
	"body" text NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
	"post_id" text NOT NULL,
	"parent_id" text,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"reply_count" integer DEFAULT 0 NOT NULL,
	"like_count" integer DEFAULT 0 NOT NULL,
	"dislike_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rate" (
	"user_id" text NOT NULL,
	"comment_id" text NOT NULL,
	"like" boolean NOT NULL,
	CONSTRAINT "rate_user_id_comment_id_pk" PRIMARY KEY("user_id","comment_id")
);
--> statement-breakpoint
CREATE TABLE "guestbook" (
	"id" text PRIMARY KEY NOT NULL,
	"body" text NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "likes_session" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
	"likes" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post" (
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
	"slug" text PRIMARY KEY NOT NULL,
	"likes" integer DEFAULT 0 NOT NULL,
	"views" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_post_id_post_slug_fk" FOREIGN KEY ("post_id") REFERENCES "public"."post"("slug") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rate" ADD CONSTRAINT "rate_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rate" ADD CONSTRAINT "rate_comment_id_comment_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."comment"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guestbook" ADD CONSTRAINT "guestbook_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_comment_post_id" ON "comment" USING btree ("post_id");--> statement-breakpoint
CREATE INDEX "idx_comment_parent_id" ON "comment" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "idx_comment_user_id" ON "comment" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_comment_post_created" ON "comment" USING btree ("post_id","created_at" DESC NULLS LAST) WHERE "comment"."parent_id" IS NULL;--> statement-breakpoint
CREATE INDEX "idx_comment_parent_created" ON "comment" USING btree ("parent_id","created_at" DESC NULLS LAST) WHERE "comment"."parent_id" IS NOT NULL;--> statement-breakpoint
CREATE INDEX "idx_comment_body_search" ON "comment" USING gin (to_tsvector('english', "body"));--> statement-breakpoint
CREATE INDEX "idx_rate_comment_like" ON "rate" USING btree ("comment_id","like");--> statement-breakpoint
CREATE INDEX "idx_rate_user_comment" ON "rate" USING btree ("user_id","comment_id");--> statement-breakpoint
CREATE INDEX "idx_guestbook_created" ON "guestbook" USING btree ("created_at" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "idx_guestbook_user_id" ON "guestbook" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_post_created" ON "post" USING btree ("created_at" DESC NULLS LAST);