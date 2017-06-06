import { Events } from '@storefront/core';
import PageSize from '../../src/page-size';
import suite from './_suite';

suite('PageSize', ({ expect, spy, stub }) => {
  let pageSize: PageSize;
  let selectPageSizesStub: sinon.SinonStub;

  beforeEach(() => {
    PageSize.prototype.flux = <any>{ store: { getState: () => ({ data: { page: { sizes: {} } } }) } };
    selectPageSizesStub = stub(PageSize.prototype, 'selectPageSizes');
    pageSize = new PageSize();
  });
  afterEach(() => delete PageSize.prototype.flux);

  describe('init()', () => {
    it('should listen for PAGE_SIZE_UPDATED', () => {
      const on = spy();
      pageSize.flux = <any>{ on };

      pageSize.init();

      expect(on).to.be.calledWith(Events.PAGE_SIZE_UPDATED, pageSize.updatePageSizes);
    });
  });

  describe('updatePageSizes()', () => {
    it('should set pageSizes', () => {
      const state: any = { a: 'b' };
      const selected = ['c', 'd'];
      const selectPageSizes = pageSize.selectPageSizes = spy(() => selected);
      const set = pageSize.set = spy();

      pageSize.updatePageSizes(state);

      expect(selectPageSizes).to.be.calledWith(state);
      expect(set).to.be.calledWith({ pageSizes: selected });
    });
  });

  describe('selectPageSizes()', () => {
    beforeEach(() => selectPageSizesStub.restore());

    it('should remap page sizes to options', () => {
      const state: any = {
        items: [12, 14, 16],
        selected: 2
      };

      const pageSizes = pageSize.selectPageSizes(state);

      expect(pageSizes).to.eql([
        { value: 12, label: 12, selected: false },
        { value: 14, label: 14, selected: false },
        { value: 16, label: 16, selected: true }
      ]);
    });
  });
});
