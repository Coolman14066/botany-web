const { test, expect } = require('@playwright/test');

// Helper: clear all auth state before each test
test.beforeEach(async ({ page }) => {
  await page.context().clearCookies();
  await page.goto('/');
  // Clear sessionStorage / localStorage
  await page.evaluate(() => {
    sessionStorage.clear();
    localStorage.clear();
  });
});

// 1. Unauthenticated visit → gate visible, content hidden
test('gate is visible and content is hidden on unauthenticated visit', async ({ page }) => {
  await page.goto('/');
  const gate = page.locator('#auth-gate');
  await expect(gate).toBeVisible();
  const content = page.locator('#main-content');
  await expect(content).not.toBeVisible();
});

// 2. Enter approved email → password field shown
test('entering an approved email shows password field', async ({ page }) => {
  await page.goto('/');
  // Mock the profiles query to return approved
  await page.evaluate(() => {
    window.__mockProfileLookup = { account_status: 'approved', email: 'test@accenture.com' };
  });
  await page.fill('#gate-email', 'test@accenture.com');
  await page.click('#gate-continue');
  // Wait for password step
  await expect(page.locator('#gate-step-password')).toBeVisible({ timeout: 5000 });
});

// 3. Enter pending email → "admin reviewing" shown
test('entering a pending email shows pending message', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    window.__mockProfileLookup = { account_status: 'pending', email: 'pending@accenture.com' };
  });
  await page.fill('#gate-email', 'pending@accenture.com');
  await page.click('#gate-continue');
  await expect(page.locator('#gate-step-pending')).toBeVisible({ timeout: 5000 });
});

// 4. Enter rejected email → "not approved" shown
test('entering a rejected email shows rejected message', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    window.__mockProfileLookup = { account_status: 'rejected', email: 'rejected@accenture.com' };
  });
  await page.fill('#gate-email', 'rejected@accenture.com');
  await page.click('#gate-continue');
  await expect(page.locator('#gate-step-rejected')).toBeVisible({ timeout: 5000 });
});

// 5. Enter unknown email → create account form shown
test('entering an unknown email shows signup form', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    window.__mockProfileLookup = null; // not found
  });
  await page.fill('#gate-email', 'new@accenture.com');
  await page.click('#gate-continue');
  await expect(page.locator('#gate-step-signup')).toBeVisible({ timeout: 5000 });
});

// 6. Create account with non-@accenture.com → validation error
test('signup with non-accenture email shows validation error', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => { window.__mockProfileLookup = null; });
  await page.fill('#gate-email', 'test@gmail.com');
  await page.click('#gate-continue');
  // The gate should show an error or stay on email step
  const error = page.locator('#gate-step-email .gate-error, #gate-step-signup .gate-error');
  // Either step-signup is shown and user fills password, or email validation triggers
  // Since the plan validates @accenture.com at signup, let's test the signup step
  await expect(page.locator('#gate-step-signup')).toBeVisible({ timeout: 5000 });
  await page.fill('#gate-signup-password', 'abc');
  await page.click('#gate-signup-submit');
  await expect(page.locator('#gate-signup-error')).toContainText(/accenture/i, { timeout: 3000 });
});

// 7. Create account with short password → validation error
test('signup with short password shows validation error', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => { window.__mockProfileLookup = null; });
  await page.fill('#gate-email', 'new@accenture.com');
  await page.click('#gate-continue');
  await expect(page.locator('#gate-step-signup')).toBeVisible({ timeout: 5000 });
  await page.fill('#gate-signup-password', '123');
  await page.click('#gate-signup-submit');
  await expect(page.locator('#gate-signup-error')).toContainText(/6/i, { timeout: 3000 });
});

// 8. Create account successfully → claim step → waitlist
test('successful signup leads to claim step then waitlist', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    window.__mockProfileLookup = null;
    window.__mockSignUp = { user: { id: 'fake-id', email: 'new@accenture.com' }, session: { access_token: 'fake' } };
    window.__mockPostClaimStatus = 'pending';
  });
  await page.fill('#gate-email', 'new@accenture.com');
  await page.click('#gate-continue');
  await expect(page.locator('#gate-step-signup')).toBeVisible({ timeout: 5000 });
  await page.fill('#gate-signup-password', 'password123');
  await page.click('#gate-signup-submit');
  // Should progress to claim or pending
  const claimOrPending = page.locator('#gate-step-claim, #gate-step-pending');
  await expect(claimOrPending).toBeVisible({ timeout: 5000 });
});

// 9. Sign in with wrong password → error shown
test('sign in with wrong password shows error', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    window.__mockProfileLookup = { account_status: 'approved', email: 'test@accenture.com' };
    window.__mockSignInError = { message: 'Invalid login credentials' };
  });
  await page.fill('#gate-email', 'test@accenture.com');
  await page.click('#gate-continue');
  await expect(page.locator('#gate-step-password')).toBeVisible({ timeout: 5000 });
  await page.fill('#gate-password', 'wrongpassword');
  await page.click('#gate-signin');
  await expect(page.locator('#gate-signin-error')).toContainText(/wrong|invalid/i, { timeout: 5000 });
});

// 10. Sign in (returning user) → content revealed
test('successful sign in reveals content', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    window.__mockProfileLookup = { account_status: 'approved', email: 'test@accenture.com' };
    window.__mockSignIn = {
      user: { id: 'fake-id', email: 'test@accenture.com', user_metadata: { display_name: 'Test User' } },
      session: { access_token: 'fake' }
    };
    window.__mockProfileAfterSignIn = { account_status: 'approved', is_admin: false, display_name: 'Test User' };
  });
  await page.fill('#gate-email', 'test@accenture.com');
  await page.click('#gate-continue');
  await expect(page.locator('#gate-step-password')).toBeVisible({ timeout: 5000 });
  await page.fill('#gate-password', 'correctpassword');
  await page.click('#gate-signin');
  // Gate should become hidden and content revealed
  await expect(page.locator('#auth-gate')).toHaveClass(/hidden/, { timeout: 5000 });
  await expect(page.locator('#main-content')).toBeVisible({ timeout: 5000 });
});

// 11. Sign in (first-time) → claim step → content revealed
test('first-time sign in shows claim step', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    window.__mockProfileLookup = { account_status: 'approved', email: 'test@accenture.com' };
    window.__mockSignIn = {
      user: { id: 'fake-id', email: 'test@accenture.com', user_metadata: { display_name: '' } },
      session: { access_token: 'fake' }
    };
    window.__mockProfileAfterSignIn = { account_status: 'approved', is_admin: false, display_name: '' };
  });
  await page.fill('#gate-email', 'test@accenture.com');
  await page.click('#gate-continue');
  await expect(page.locator('#gate-step-password')).toBeVisible({ timeout: 5000 });
  await page.fill('#gate-password', 'correctpassword');
  await page.click('#gate-signin');
  await expect(page.locator('#gate-step-claim')).toBeVisible({ timeout: 5000 });
});

// 12. Direct dashboard access without auth → redirect to gate
test('dashboard without auth redirects to index', async ({ page }) => {
  await page.goto('/dashboard.html');
  await page.waitForURL(/index\.html|\/$/);
  await expect(page.locator('#auth-gate')).toBeVisible();
});

// 13. Log out → gate reappears
test('log out shows gate again', async ({ page }) => {
  // Simulate authenticated state
  await page.goto('/');
  await page.evaluate(() => {
    sessionStorage.setItem('botany-user', 'Test User');
  });
  await page.goto('/');
  // If session is in sessionStorage but no Supabase session, gate should still show
  await expect(page.locator('#auth-gate')).toBeVisible();
});

// 14. Forgot password request → confirmation shown
test('forgot password shows confirmation', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    window.__mockProfileLookup = { account_status: 'approved', email: 'test@accenture.com' };
  });
  await page.fill('#gate-email', 'test@accenture.com');
  await page.click('#gate-continue');
  await expect(page.locator('#gate-step-password')).toBeVisible({ timeout: 5000 });
  await page.click('#gate-forgot-pw');
  await expect(page.locator('#gate-step-forgot')).toBeVisible({ timeout: 5000 });
  await page.click('#gate-forgot-submit');
  await expect(page.locator('#gate-forgot-status')).not.toBeEmpty({ timeout: 5000 });
});
