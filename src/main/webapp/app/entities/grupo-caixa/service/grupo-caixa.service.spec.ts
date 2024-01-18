import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IGrupoCaixa } from '../grupo-caixa.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../grupo-caixa.test-samples';

import { GrupoCaixaService } from './grupo-caixa.service';

const requireRestSample: IGrupoCaixa = {
  ...sampleWithRequiredData,
};

describe('GrupoCaixa Service', () => {
  let service: GrupoCaixaService;
  let httpMock: HttpTestingController;
  let expectedResult: IGrupoCaixa | IGrupoCaixa[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(GrupoCaixaService);
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

    it('should create a GrupoCaixa', () => {
      const grupoCaixa = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(grupoCaixa).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a GrupoCaixa', () => {
      const grupoCaixa = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(grupoCaixa).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a GrupoCaixa', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of GrupoCaixa', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a GrupoCaixa', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addGrupoCaixaToCollectionIfMissing', () => {
      it('should add a GrupoCaixa to an empty array', () => {
        const grupoCaixa: IGrupoCaixa = sampleWithRequiredData;
        expectedResult = service.addGrupoCaixaToCollectionIfMissing([], grupoCaixa);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(grupoCaixa);
      });

      it('should not add a GrupoCaixa to an array that contains it', () => {
        const grupoCaixa: IGrupoCaixa = sampleWithRequiredData;
        const grupoCaixaCollection: IGrupoCaixa[] = [
          {
            ...grupoCaixa,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addGrupoCaixaToCollectionIfMissing(grupoCaixaCollection, grupoCaixa);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a GrupoCaixa to an array that doesn't contain it", () => {
        const grupoCaixa: IGrupoCaixa = sampleWithRequiredData;
        const grupoCaixaCollection: IGrupoCaixa[] = [sampleWithPartialData];
        expectedResult = service.addGrupoCaixaToCollectionIfMissing(grupoCaixaCollection, grupoCaixa);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(grupoCaixa);
      });

      it('should add only unique GrupoCaixa to an array', () => {
        const grupoCaixaArray: IGrupoCaixa[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const grupoCaixaCollection: IGrupoCaixa[] = [sampleWithRequiredData];
        expectedResult = service.addGrupoCaixaToCollectionIfMissing(grupoCaixaCollection, ...grupoCaixaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const grupoCaixa: IGrupoCaixa = sampleWithRequiredData;
        const grupoCaixa2: IGrupoCaixa = sampleWithPartialData;
        expectedResult = service.addGrupoCaixaToCollectionIfMissing([], grupoCaixa, grupoCaixa2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(grupoCaixa);
        expect(expectedResult).toContain(grupoCaixa2);
      });

      it('should accept null and undefined values', () => {
        const grupoCaixa: IGrupoCaixa = sampleWithRequiredData;
        expectedResult = service.addGrupoCaixaToCollectionIfMissing([], null, grupoCaixa, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(grupoCaixa);
      });

      it('should return initial array if no GrupoCaixa is added', () => {
        const grupoCaixaCollection: IGrupoCaixa[] = [sampleWithRequiredData];
        expectedResult = service.addGrupoCaixaToCollectionIfMissing(grupoCaixaCollection, undefined, null);
        expect(expectedResult).toEqual(grupoCaixaCollection);
      });
    });

    describe('compareGrupoCaixa', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareGrupoCaixa(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareGrupoCaixa(entity1, entity2);
        const compareResult2 = service.compareGrupoCaixa(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareGrupoCaixa(entity1, entity2);
        const compareResult2 = service.compareGrupoCaixa(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareGrupoCaixa(entity1, entity2);
        const compareResult2 = service.compareGrupoCaixa(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
