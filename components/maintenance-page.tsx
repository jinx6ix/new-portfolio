export const metadata = {
  title: 'Maintenance Mode',
  description: 'Site is under maintenance',
};

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <div className="w-24 h-24 mx-auto bg-yellow-500/20 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 17h.01" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-foreground">Site Under Maintenance</h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          We are currently performing scheduled maintenance. Please check back soon.
        </p>
        <div className="animate-pulse mt-8">
          <div className="flex justify-center gap-1">
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
}