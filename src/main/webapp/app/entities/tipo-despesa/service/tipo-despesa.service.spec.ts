import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITipoDespesa } from '../tipo-despesa.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../tipo-despesa.test-samples';

import { TipoDespesaService } from './tipo-despesa.service';

const requireRestSample: ITipoDespesa = {
  ...sampleWithRequiredData,
};

describe('TipoDespesa Service', () => {
  let service: TipoDespesaService;
  let httpMock: HttpTestingController;
  let expectedResult: ITipoDespesa | ITipoDespesa[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TipoDespesaService);
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

    it('should create a TipoDespesa', () => {
      const tipoDespesa = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(tipoDespesa).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TipoDespesa', () => {
      const tipoDespesa = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(tipoDespesa).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TipoDespesa', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TipoDespesa', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TipoDespesa', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTipoDespesaToCollectionIfMissing', () => {
      it('should add a TipoDespesa to an empty array', () => {
        const tipoDespesa: ITipoDespesa = sampleWithRequiredData;
        expectedResult = service.addTipoDespesaToCollectionIfMissing([], tipoDespesa);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tipoDespesa);
      });

      it('should not add a TipoDespesa to an array that contains it', () => {
        const tipoDespesa: ITipoDespesa = sampleWithRequiredData;
        const tipoDespesaCollection: ITipoDespesa[] = [
          {
            ...tipoDespesa,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTipoDespesaToCollectionIfMissing(tipoDespesaCollection, tipoDespesa);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TipoDespesa to an array that doesn't contain it", () => {
        const tipoDespesa: ITipoDespesa = sampleWithRequiredData;
        const tipoDespesaCollection: ITipoDespesa[] = [sampleWithPartialData];
        expectedResult = service.addTipoDespesaToCollectionIfMissing(tipoDespesaCollection, tipoDespesa);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tipoDespesa);
      });

      it('should add only unique TipoDespesa to an array', () => {
        const tipoDespesaArray: ITipoDespesa[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const tipoDespesaCollection: ITipoDespesa[] = [sampleWithRequiredData];
        expectedResult = service.addTipoDespesaToCollectionIfMissing(tipoDespesaCollection, ...tipoDespesaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const tipoDespesa: ITipoDespesa = sampleWithRequiredData;
        const tipoDespesa2: ITipoDespesa = sampleWithPartialData;
        expectedResult = service.addTipoDespesaToCollectionIfMissing([], tipoDespesa, tipoDespesa2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tipoDespesa);
        expect(expectedResult).toContain(tipoDespesa2);
      });

      it('should accept null and undefined values', () => {
        const tipoDespesa: ITipoDespesa = sampleWithRequiredData;
        expectedResult = service.addTipoDespesaToCollectionIfMissing([], null, tipoDespesa, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tipoDespesa);
      });

      it('should return initial array if no TipoDespesa is added', () => {
        const tipoDespesaCollection: ITipoDespesa[] = [sampleWithRequiredData];
        expectedResult = service.addTipoDespesaToCollectionIfMissing(tipoDespesaCollection, undefined, null);
        expect(expectedResult).toEqual(tipoDespesaCollection);
      });
    });

    describe('compareTipoDespesa', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTipoDespesa(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTipoDespesa(entity1, entity2);
        const compareResult2 = service.compareTipoDespesa(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTipoDespesa(entity1, entity2);
        const compareResult2 = service.compareTipoDespesa(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTipoDespesa(entity1, entity2);
        const compareResult2 = service.compareTipoDespesa(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
