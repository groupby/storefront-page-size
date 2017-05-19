import { Component, Events } from '@storefront/core';
import PageSize from '../../src/page-size';
import suite from './_suite';

suite('PageSize', ({ expect, spy }) => {

  describe('constructor()', () => {
    afterEach(() => delete Component.prototype.flux);

    it('should listen for PAGE_SIZE_UPDATED', () => {
      const on = spy();
      Component.prototype.flux = <any>{ on };

      const pageSize = new PageSize();

      expect(on.calledWith(Events.PAGE_SIZE_UPDATED, pageSize.updatePageSizes)).to.be.true;
    });
  });

  describe('actions', () => {
    let pageSize: PageSize;

    beforeEach(() => {
      Component.prototype.flux = <any>{ on: () => null };
      pageSize = new PageSize();
    });
    afterEach(() => delete Component.prototype.flux);

    describe('onBeforeMount()', () => {
      it('should update state', () => {
        const sizes = ['a', 'b'];
        const selected = ['c', 'd'];
        const state = { data: { page: { sizes } } };
        const selectPageSizes = pageSize.selectPageSizes = spy(() => selected);
        const getState = spy(() => state);
        pageSize.state = <any>{ e: 'f' };
        pageSize.flux = <any>{ store: { getState } };
        pageSize.expose = () => null;

        pageSize.onBeforeMount();

        expect(selectPageSizes.calledWith(sizes)).to.be.true;
        expect(pageSize.state).to.eql({ e: 'f', pageSizes: selected });
      });

      it('should call expose()', () => {
        const expose = pageSize.expose = spy();
        pageSize.selectPageSizes = () => null;
        pageSize.flux = <any>{ store: { getState: () => ({ data: { page: { sizes: [] } } }) } };

        pageSize.onBeforeMount();

        expect(expose.calledWith('pageSize')).to.be.true;
      });
    });

    describe('updatePageSizes()', () => {
      it('should set pageSizes', () => {
        const state: any = { a: 'b' };
        const selected = ['c', 'd'];
        const selectPageSizes = pageSize.selectPageSizes = spy(() => selected);
        const set = pageSize.set = spy();

        pageSize.updatePageSizes(state);

        expect(selectPageSizes.calledWith(state)).to.be.true;
        expect(set.calledWith({ pageSizes: selected }));
      });
    });

    describe('selectPageSizes()', () => {
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
});
