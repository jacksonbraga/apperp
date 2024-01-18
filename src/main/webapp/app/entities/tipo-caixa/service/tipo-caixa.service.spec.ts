import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITipoCaixa } from '../tipo-caixa.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../tipo-caixa.test-samples';

import { TipoCaixaService } from './tipo-caixa.service';

const requireRestSample: ITipoCaixa = {
  ...sampleWithRequiredData,
};

describe('TipoCaixa Service', () => {
  let service: TipoCaixaService;
  let httpMock: HttpTestingController;
  let expectedResult: ITipoCaixa | ITipoCaixa[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TipoCaixaService);
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

    it('should create a TipoCaixa', () => {
      const tipoCaixa = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(tipoCaixa).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TipoCaixa', () => {
      const tipoCaixa = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(tipoCaixa).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TipoCaixa', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TipoCaixa', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TipoCaixa', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTipoCaixaToCollectionIfMissing', () => {
      it('should add a TipoCaixa to an empty array', () => {
        const tipoCaixa: ITipoCaixa = sampleWithRequiredData;
        expectedResult = service.addTipoCaixaToCollectionIfMissing([], tipoCaixa);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tipoCaixa);
      });

      it('should not add a TipoCaixa to an array that contains it', () => {
        const tipoCaixa: ITipoCaixa = sampleWithRequiredData;
        const tipoCaixaCollection: ITipoCaixa[] = [
          {
            ...tipoCaixa,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTipoCaixaToCollectionIfMissing(tipoCaixaCollection, tipoCaixa);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TipoCaixa to an array that doesn't contain it", () => {
        const tipoCaixa: ITipoCaixa = sampleWithRequiredData;
        const tipoCaixaCollection: ITipoCaixa[] = [sampleWithPartialData];
        expectedResult = service.addTipoCaixaToCollectionIfMissing(tipoCaixaCollection, tipoCaixa);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tipoCaixa);
      });

      it('should add only unique TipoCaixa to an array', () => {
        const tipoCaixaArray: ITipoCaixa[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const tipoCaixaCollection: ITipoCaixa[] = [sampleWithRequiredData];
        expectedResult = service.addTipoCaixaToCollectionIfMissing(tipoCaixaCollection, ...tipoCaixaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const tipoCaixa: ITipoCaixa = sampleWithRequiredData;
        const tipoCaixa2: ITipoCaixa = sampleWithPartialData;
        expectedResult = service.addTipoCaixaToCollectionIfMissing([], tipoCaixa, tipoCaixa2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tipoCaixa);
        expect(expectedResult).toContain(tipoCaixa2);
      });

      it('should accept null and undefined values', () => {
        const tipoCaixa: ITipoCaixa = sampleWithRequiredData;
        expectedResult = service.addTipoCaixaToCollectionIfMissing([], null, tipoCaixa, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tipoCaixa);
      });

      it('should return initial array if no TipoCaixa is added', () => {
        const tipoCaixaCollection: ITipoCaixa[] = [sampleWithRequiredData];
        expectedResult = service.addTipoCaixaToCollectionIfMissing(tipoCaixaCollection, undefined, null);
        expect(expectedResult).toEqual(tipoCaixaCollection);
      });
    });

    describe('compareTipoCaixa', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTipoCaixa(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTipoCaixa(entity1, entity2);
        const compareResult2 = service.compareTipoCaixa(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTipoCaixa(entity1, entity2);
        const compareResult2 = service.compareTipoCaixa(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTipoCaixa(entity1, entity2);
        const compareResult2 = service.compareTipoCaixa(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
