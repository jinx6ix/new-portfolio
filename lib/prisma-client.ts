interface AdminRecord { id: string; username: string; password: string; createdAt?: Date; updatedAt?: Date; }
interface AdRecord { id: string; [key: string]: any }
interface AdOrderRecord { id: string; [key: string]: any }
interface AnalyticsEventRecord { id: string; [key: string]: any }
interface SiteSettingsRecord { id?: string; [key: string]: any }

class PrismaClient {
  constructor(options?: any) {}

  $connect(): Promise<void> { return Promise.resolve(); }
  $disconnect(): Promise<void> { return Promise.resolve(); }

  get ad(): AdDelegate { return new AdDelegate(); }
  get adOrder(): AdOrderDelegate { return new AdOrderDelegate(); }
  get analyticsEvent(): AnalyticsEventDelegate { return new AnalyticsEventDelegate(); }
  get siteSettings(): SiteSettingsDelegate { return new SiteSettingsDelegate(); }
  get admin(): AdminDelegate { return new AdminDelegate(); }
}

class AdminDelegate {
  findMany(args?: any): Promise<AdminRecord[]> { return Promise.resolve([]); }
  findFirst(args?: any): Promise<AdminRecord | null> { return Promise.resolve(null); }
  findUnique(args?: any): Promise<AdminRecord | null> { return Promise.resolve(null); }
  create(args?: any): Promise<AdminRecord> { return Promise.resolve({ id: '', username: '', password: '' }); }
  update(args?: any): Promise<AdminRecord> { return Promise.resolve({ id: '', username: '', password: '' }); }
  delete(args?: any): Promise<AdminRecord> { return Promise.resolve({ id: '', username: '', password: '' }); }
}

class AdDelegate {
  findMany(args?: any): Promise<AdRecord[]> { return Promise.resolve([]); }
  findFirst(args?: any): Promise<AdRecord | null> { return Promise.resolve(null); }
  findUnique(args?: any): Promise<AdRecord | null> { return Promise.resolve(null); }
  create(args?: any): Promise<AdRecord> { return Promise.resolve({ id: '' }); }
  update(args?: any): Promise<AdRecord> { return Promise.resolve({ id: '' }); }
  delete(args?: any): Promise<AdRecord> { return Promise.resolve({ id: '' }); }
  count(args?: any): Promise<number> { return Promise.resolve(0); }
}

class AdOrderDelegate {
  findMany(args?: any): Promise<AdOrderRecord[]> { return Promise.resolve([]); }
  findFirst(args?: any): Promise<AdOrderRecord | null> { return Promise.resolve(null); }
  findUnique(args?: any): Promise<AdOrderRecord | null> { return Promise.resolve(null); }
  create(args?: any): Promise<AdOrderRecord> { return Promise.resolve({ id: '' }); }
  update(args?: any): Promise<AdOrderRecord> { return Promise.resolve({ id: '' }); }
  delete(args?: any): Promise<AdOrderRecord> { return Promise.resolve({ id: '' }); }
  count(args?: any): Promise<number> { return Promise.resolve(0); }
}

class AnalyticsEventDelegate {
  findMany(args?: any): Promise<AnalyticsEventRecord[]> { return Promise.resolve([]); }
  findFirst(args?: any): Promise<AnalyticsEventRecord | null> { return Promise.resolve(null); }
  findUnique(args?: any): Promise<AnalyticsEventRecord | null> { return Promise.resolve(null); }
  create(args?: any): Promise<AnalyticsEventRecord> { return Promise.resolve({ id: '' }); }
  update(args?: any): Promise<AnalyticsEventRecord> { return Promise.resolve({ id: '' }); }
  delete(args?: any): Promise<AnalyticsEventRecord> { return Promise.resolve({ id: '' }); }
  count(args?: any): Promise<number> { return Promise.resolve(0); }
}

class SiteSettingsDelegate {
  findMany(args?: any): Promise<SiteSettingsRecord[]> { return Promise.resolve([]); }
  findFirst(args?: any): Promise<SiteSettingsRecord | null> { return Promise.resolve(null); }
  findUnique(args?: any): Promise<SiteSettingsRecord | null> { return Promise.resolve(null); }
  create(args?: any): Promise<SiteSettingsRecord> { return Promise.resolve({}); }
  update(args?: any): Promise<SiteSettingsRecord> { return Promise.resolve({}); }
  upsert(args?: any): Promise<SiteSettingsRecord> { return Promise.resolve({}); }
}

export { PrismaClient };