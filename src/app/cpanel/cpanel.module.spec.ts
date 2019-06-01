import { CpanelModule } from './cpanel.module';

describe('CpanelModule', () => {
  let cpanelModule: CpanelModule;

  beforeEach(() => {
    cpanelModule = new CpanelModule();
  });

  it('should create an instance', () => {
    expect(cpanelModule).toBeTruthy();
  });
});
