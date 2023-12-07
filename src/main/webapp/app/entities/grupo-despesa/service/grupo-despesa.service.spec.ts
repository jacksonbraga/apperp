import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IGrupoDespesa } from '../grupo-despesa.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../grupo-despesa.test-samples';

import { GrupoDespesaService } from './grupo-despesa.service';

const requireRestSample: IGrupoDespesa = {
  ...sampleWithRequiredData,
};

describe('GrupoDespesa Service', () => {
  let service: GrupoDespesaService;
  let httpMock: HttpTestingController;
  let expectedResult: IGrupoDespesa | IGrupoDespesa[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(GrupoDespesaService);
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

    it('should create a GrupoDespesa', () => {
      const grupoDespesa = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(grupoDespesa).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a GrupoDespesa', () => {
      const grupoDespesa = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(grupoDespesa).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a GrupoDespesa', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of GrupoDespesa', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a GrupoDespesa', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addGrupoDespesaToCollectionIfMissing', () => {
      it('should add a GrupoDespesa to an empty array', () => {
        const grupoDespesa: IGrupoDespesa = sampleWithRequiredData;
        expectedResult = service.addGrupoDespesaToCollectionIfMissing([], grupoDespesa);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(grupoDespesa);
      });

      it('should not add a GrupoDespesa to an array that contains it', () => {
        const grupoDespesa: IGrupoDespesa = sampleWithRequiredData;
        const grupoDespesaCollection: IGrupoDespesa[] = [
          {
            ...grupoDespesa,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addGrupoDespesaToCollectionIfMissing(grupoDespesaCollection, grupoDespesa);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a GrupoDespesa to an array that doesn't contain it", () => {
        const grupoDespesa: IGrupoDespesa = sampleWithRequiredData;
        const grupoDespesaCollection: IGrupoDespesa[] = [sampleWithPartialData];
        expectedResult = service.addGrupoDespesaToCollectionIfMissing(grupoDespesaCollection, grupoDespesa);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(grupoDespesa);
      });

      it('should add only unique GrupoDespesa to an array', () => {
        const grupoDespesaArray: IGrupoDespesa[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const grupoDespesaCollection: IGrupoDespesa[] = [sampleWithRequiredData];
        expectedResult = service.addGrupoDespesaToCollectionIfMissing(grupoDespesaCollection, ...grupoDespesaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const grupoDespesa: IGrupoDespesa = sampleWithRequiredData;
        const grupoDespesa2: IGrupoDespesa = sampleWithPartialData;
        expectedResult = service.addGrupoDespesaToCollectionIfMissing([], grupoDespesa, grupoDespesa2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(grupoDespesa);
        expect(expectedResult).toContain(grupoDespesa2);
      });

      it('should accept null and undefined values', () => {
        const grupoDespesa: IGrupoDespesa = sampleWithRequiredData;
        expectedResult = service.addGrupoDespesaToCollectionIfMissing([], null, grupoDespesa, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(grupoDespesa);
      });

      it('should return initial array if no GrupoDespesa is added', () => {
        const grupoDespesaCollection: IGrupoDespesa[] = [sampleWithRequiredData];
        expectedResult = service.addGrupoDespesaToCollectionIfMissing(grupoDespesaCollection, undefined, null);
        expect(expectedResult).toEqual(grupoDespesaCollection);
      });
    });

    describe('compareGrupoDespesa', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareGrupoDespesa(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareGrupoDespesa(entity1, entity2);
        const compareResult2 = service.compareGrupoDespesa(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareGrupoDespesa(entity1, entity2);
        const compareResult2 = service.compareGrupoDespesa(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareGrupoDespesa(entity1, entity2);
        const compareResult2 = service.compareGrupoDespesa(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
