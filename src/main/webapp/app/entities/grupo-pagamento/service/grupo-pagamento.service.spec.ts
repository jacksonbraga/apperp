import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IGrupoPagamento } from '../grupo-pagamento.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../grupo-pagamento.test-samples';

import { GrupoPagamentoService } from './grupo-pagamento.service';

const requireRestSample: IGrupoPagamento = {
  ...sampleWithRequiredData,
};

describe('GrupoPagamento Service', () => {
  let service: GrupoPagamentoService;
  let httpMock: HttpTestingController;
  let expectedResult: IGrupoPagamento | IGrupoPagamento[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(GrupoPagamentoService);
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

    it('should create a GrupoPagamento', () => {
      const grupoPagamento = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(grupoPagamento).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a GrupoPagamento', () => {
      const grupoPagamento = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(grupoPagamento).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a GrupoPagamento', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of GrupoPagamento', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a GrupoPagamento', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addGrupoPagamentoToCollectionIfMissing', () => {
      it('should add a GrupoPagamento to an empty array', () => {
        const grupoPagamento: IGrupoPagamento = sampleWithRequiredData;
        expectedResult = service.addGrupoPagamentoToCollectionIfMissing([], grupoPagamento);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(grupoPagamento);
      });

      it('should not add a GrupoPagamento to an array that contains it', () => {
        const grupoPagamento: IGrupoPagamento = sampleWithRequiredData;
        const grupoPagamentoCollection: IGrupoPagamento[] = [
          {
            ...grupoPagamento,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addGrupoPagamentoToCollectionIfMissing(grupoPagamentoCollection, grupoPagamento);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a GrupoPagamento to an array that doesn't contain it", () => {
        const grupoPagamento: IGrupoPagamento = sampleWithRequiredData;
        const grupoPagamentoCollection: IGrupoPagamento[] = [sampleWithPartialData];
        expectedResult = service.addGrupoPagamentoToCollectionIfMissing(grupoPagamentoCollection, grupoPagamento);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(grupoPagamento);
      });

      it('should add only unique GrupoPagamento to an array', () => {
        const grupoPagamentoArray: IGrupoPagamento[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const grupoPagamentoCollection: IGrupoPagamento[] = [sampleWithRequiredData];
        expectedResult = service.addGrupoPagamentoToCollectionIfMissing(grupoPagamentoCollection, ...grupoPagamentoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const grupoPagamento: IGrupoPagamento = sampleWithRequiredData;
        const grupoPagamento2: IGrupoPagamento = sampleWithPartialData;
        expectedResult = service.addGrupoPagamentoToCollectionIfMissing([], grupoPagamento, grupoPagamento2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(grupoPagamento);
        expect(expectedResult).toContain(grupoPagamento2);
      });

      it('should accept null and undefined values', () => {
        const grupoPagamento: IGrupoPagamento = sampleWithRequiredData;
        expectedResult = service.addGrupoPagamentoToCollectionIfMissing([], null, grupoPagamento, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(grupoPagamento);
      });

      it('should return initial array if no GrupoPagamento is added', () => {
        const grupoPagamentoCollection: IGrupoPagamento[] = [sampleWithRequiredData];
        expectedResult = service.addGrupoPagamentoToCollectionIfMissing(grupoPagamentoCollection, undefined, null);
        expect(expectedResult).toEqual(grupoPagamentoCollection);
      });
    });

    describe('compareGrupoPagamento', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareGrupoPagamento(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareGrupoPagamento(entity1, entity2);
        const compareResult2 = service.compareGrupoPagamento(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareGrupoPagamento(entity1, entity2);
        const compareResult2 = service.compareGrupoPagamento(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareGrupoPagamento(entity1, entity2);
        const compareResult2 = service.compareGrupoPagamento(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
