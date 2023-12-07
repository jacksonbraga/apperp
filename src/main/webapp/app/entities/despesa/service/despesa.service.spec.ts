import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IDespesa } from '../despesa.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../despesa.test-samples';

import { DespesaService, RestDespesa } from './despesa.service';

const requireRestSample: RestDespesa = {
  ...sampleWithRequiredData,
  data: sampleWithRequiredData.data?.format(DATE_FORMAT),
  dataVencimento: sampleWithRequiredData.dataVencimento?.format(DATE_FORMAT),
};

describe('Despesa Service', () => {
  let service: DespesaService;
  let httpMock: HttpTestingController;
  let expectedResult: IDespesa | IDespesa[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DespesaService);
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

    it('should create a Despesa', () => {
      const despesa = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(despesa).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Despesa', () => {
      const despesa = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(despesa).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Despesa', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Despesa', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Despesa', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDespesaToCollectionIfMissing', () => {
      it('should add a Despesa to an empty array', () => {
        const despesa: IDespesa = sampleWithRequiredData;
        expectedResult = service.addDespesaToCollectionIfMissing([], despesa);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(despesa);
      });

      it('should not add a Despesa to an array that contains it', () => {
        const despesa: IDespesa = sampleWithRequiredData;
        const despesaCollection: IDespesa[] = [
          {
            ...despesa,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDespesaToCollectionIfMissing(despesaCollection, despesa);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Despesa to an array that doesn't contain it", () => {
        const despesa: IDespesa = sampleWithRequiredData;
        const despesaCollection: IDespesa[] = [sampleWithPartialData];
        expectedResult = service.addDespesaToCollectionIfMissing(despesaCollection, despesa);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(despesa);
      });

      it('should add only unique Despesa to an array', () => {
        const despesaArray: IDespesa[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const despesaCollection: IDespesa[] = [sampleWithRequiredData];
        expectedResult = service.addDespesaToCollectionIfMissing(despesaCollection, ...despesaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const despesa: IDespesa = sampleWithRequiredData;
        const despesa2: IDespesa = sampleWithPartialData;
        expectedResult = service.addDespesaToCollectionIfMissing([], despesa, despesa2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(despesa);
        expect(expectedResult).toContain(despesa2);
      });

      it('should accept null and undefined values', () => {
        const despesa: IDespesa = sampleWithRequiredData;
        expectedResult = service.addDespesaToCollectionIfMissing([], null, despesa, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(despesa);
      });

      it('should return initial array if no Despesa is added', () => {
        const despesaCollection: IDespesa[] = [sampleWithRequiredData];
        expectedResult = service.addDespesaToCollectionIfMissing(despesaCollection, undefined, null);
        expect(expectedResult).toEqual(despesaCollection);
      });
    });

    describe('compareDespesa', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDespesa(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDespesa(entity1, entity2);
        const compareResult2 = service.compareDespesa(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDespesa(entity1, entity2);
        const compareResult2 = service.compareDespesa(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDespesa(entity1, entity2);
        const compareResult2 = service.compareDespesa(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
