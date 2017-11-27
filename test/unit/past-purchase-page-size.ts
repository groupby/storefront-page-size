import { Events, Selectors } from '@storefront/core';
import PastPurchasesPageSize from '../../src/past-purchases-page-size';
import suite from './_suite';

const PAGE_SIZES = [10, 20, 30];

suite('PastPurchasesPageSize', ({ expect, spy, stub }) => {
  let pageSize: PastPurchasesPageSize;
  let selectPageSizesStub: sinon.SinonStub;
  let select: sinon.SinonSpy;

  beforeEach(() => {
    PastPurchasesPageSize.prototype.flux = <any>{};
    selectPageSizesStub = stub(PastPurchasesPageSize.prototype, 'selectPageSizes');
    select = PastPurchasesPageSize.prototype.select = spy(() => PAGE_SIZES);
    pageSize = new PastPurchasesPageSize();
  });
  afterEach(() => delete PastPurchasesPageSize.prototype.flux);

  describe('constructor()', () => {
    describe('state', () => {
      it('should set initial value', () => {
        const sizes = [15, 30, 50];

        expect(select).to.be.calledWith(Selectors.pastPurchasePageSizes);
        expect(selectPageSizesStub).to.be.calledWith(PAGE_SIZES);
      });

      describe('onSelect()', () => {
        it('should call actions.updatePageSize()', () => {
          const updatePastPurchasePageSize = spy();
          pageSize.actions = <any>{ updatePastPurchasePageSize };
          pageSize.state.pageSizes = <any[]>[{ value: 20 }, { value: 40 }, { value: 80 }];

          pageSize.state.onSelect(1);

          expect(updatePastPurchasePageSize).to.be.calledWith(40);
        });
      });
    });
  });

  describe('init()', () => {
    it('should listen for PAGE_SIZE_UPDATED', () => {
      const on = spy();
      pageSize.flux = <any>{ on };

      pageSize.init();

      expect(on).to.be.calledWith(Events.PAST_PURCHASE_PAGE_SIZE_UPDATED, pageSize.updatePageSizes);
    });
  });
});