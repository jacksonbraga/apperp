import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IItemComanda } from '../item-comanda.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../item-comanda.test-samples';

import { ItemComandaService, RestItemComanda } from './item-comanda.service';

const requireRestSample: RestItemComanda = {
  ...sampleWithRequiredData,
  data: sampleWithRequiredData.data?.format(DATE_FORMAT),
};

describe('ItemComanda Service', () => {
  let service: ItemComandaService;
  let httpMock: HttpTestingController;
  let expectedResult: IItemComanda | IItemComanda[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ItemComandaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a ItemComanda', () => {
      const itemComanda = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(itemComanda).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ItemComanda', () => {
      const itemComanda = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(itemComanda).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ItemComanda', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ItemComanda', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ItemComanda', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addItemComandaToCollectionIfMissing', () => {
      it('should add a ItemComanda to an empty array', () => {
        const itemComanda: IItemComanda = sampleWithRequiredData;
        expectedResult = service.addItemComandaToCollectionIfMissing([], itemComanda);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(itemComanda);
      });

      it('should not add a ItemComanda to an array that contains it', () => {
        const itemComanda: IItemComanda = sampleWithRequiredData;
        const itemComandaCollection: IItemComanda[] = [
          {
            ...itemComanda,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addItemComandaToCollectionIfMissing(itemComandaCollection, itemComanda);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ItemComanda to an array that doesn't contain it", () => {
        const itemComanda: IItemComanda = sampleWithRequiredData;
        const itemComandaCollection: IItemComanda[] = [sampleWithPartialData];
        expectedResult = service.addItemComandaToCollectionIfMissing(itemComandaCollection, itemComanda);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(itemComanda);
      });

      it('should add only unique ItemComanda to an array', () => {
        const itemComandaArray: IItemComanda[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const itemComandaCollection: IItemComanda[] = [sampleWithRequiredData];
        expectedResult = service.addItemComandaToCollectionIfMissing(itemComandaCollection, ...itemComandaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const itemComanda: IItemComanda = sampleWithRequiredData;
        const itemComanda2: IItemComanda = sampleWithPartialData;
        expectedResult = service.addItemComandaToCollectionIfMissing([], itemComanda, itemComanda2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(itemComanda);
        expect(expectedResult).toContain(itemComanda2);
      });

      it('should accept null and undefined values', () => {
        const itemComanda: IItemComanda = sampleWithRequiredData;
        expectedResult = service.addItemComandaToCollectionIfMissing([], null, itemComanda, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(itemComanda);
      });

      it('should return initial array if no ItemComanda is added', () => {
        const itemComandaCollection: IItemComanda[] = [sampleWithRequiredData];
        expectedResult = service.addItemComandaToCollectionIfMissing(itemComandaCollection, undefined, null);
        expect(expectedResult).toEqual(itemComandaCollection);
      });
    });

    describe('compareItemComanda', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareItemComanda(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareItemComanda(entity1, entity2);
        const compareResult2 = service.compareItemComanda(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareItemComanda(entity1, entity2);
        const compareResult2 = service.compareItemComanda(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareItemComanda(entity1, entity2);
        const compareResult2 = service.compareItemComanda(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
