-- Remove tables not relevant to nutrition tracking app
DROP TABLE IF EXISTS connected_systems_quotes CASCADE;
DROP TABLE IF EXISTS contact_forms CASCADE;
DROP TABLE IF EXISTS discount_campaigns CASCADE;
DROP TABLE IF EXISTS newsletter_subscribers CASCADE;
DROP TABLE IF EXISTS onboarding_forms CASCADE;
DROP TABLE IF EXISTS plan_discount_campaigns CASCADE;
DROP TABLE IF EXISTS plan_features CASCADE;
DROP TABLE IF EXISTS plan_onboarding_forms CASCADE;
DROP TABLE IF EXISTS plan_regional_discount_campaigns CASCADE;
DROP TABLE IF EXISTS plan_regional_pricing CASCADE;
DROP TABLE IF EXISTS pricing_categories CASCADE;
DROP TABLE IF EXISTS pricing_plans CASCADE;
DROP TABLE IF EXISTS pricing_regions CASCADE;
DROP TABLE IF EXISTS project_info_forms CASCADE;
DROP TABLE IF EXISTS testimonial_forms CASCADE;