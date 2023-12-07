import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITipoPagamento } from '../tipo-pagamento.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../tipo-pagamento.test-samples';

import { TipoPagamentoService } from './tipo-pagamento.service';

const requireRestSample: ITipoPagamento = {
  ...sampleWithRequiredData,
};

describe('TipoPagamento Service', () => {
  let service: TipoPagamentoService;
  let httpMock: HttpTestingController;
  let expectedResult: ITipoPagamento | ITipoPagamento[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TipoPagamentoService);
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

    it('should create a TipoPagamento', () => {
      const tipoPagamento = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(tipoPagamento).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TipoPagamento', () => {
      const tipoPagamento = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(tipoPagamento).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TipoPagamento', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TipoPagamento', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TipoPagamento', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTipoPagamentoToCollectionIfMissing', () => {
      it('should add a TipoPagamento to an empty array', () => {
        const tipoPagamento: ITipoPagamento = sampleWithRequiredData;
        expectedResult = service.addTipoPagamentoToCollectionIfMissing([], tipoPagamento);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tipoPagamento);
      });

      it('should not add a TipoPagamento to an array that contains it', () => {
        const tipoPagamento: ITipoPagamento = sampleWithRequiredData;
        const tipoPagamentoCollection: ITipoPagamento[] = [
          {
            ...tipoPagamento,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTipoPagamentoToCollectionIfMissing(tipoPagamentoCollection, tipoPagamento);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TipoPagamento to an array that doesn't contain it", () => {
        const tipoPagamento: ITipoPagamento = sampleWithRequiredData;
        const tipoPagamentoCollection: ITipoPagamento[] = [sampleWithPartialData];
        expectedResult = service.addTipoPagamentoToCollectionIfMissing(tipoPagamentoCollection, tipoPagamento);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tipoPagamento);
      });

      it('should add only unique TipoPagamento to an array', () => {
        const tipoPagamentoArray: ITipoPagamento[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const tipoPagamentoCollection: ITipoPagamento[] = [sampleWithRequiredData];
        expectedResult = service.addTipoPagamentoToCollectionIfMissing(tipoPagamentoCollection, ...tipoPagamentoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const tipoPagamento: ITipoPagamento = sampleWithRequiredData;
        const tipoPagamento2: ITipoPagamento = sampleWithPartialData;
        expectedResult = service.addTipoPagamentoToCollectionIfMissing([], tipoPagamento, tipoPagamento2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tipoPagamento);
        expect(expectedResult).toContain(tipoPagamento2);
      });

      it('should accept null and undefined values', () => {
        const tipoPagamento: ITipoPagamento = sampleWithRequiredData;
        expectedResult = service.addTipoPagamentoToCollectionIfMissing([], null, tipoPagamento, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tipoPagamento);
      });

      it('should return initial array if no TipoPagamento is added', () => {
        const tipoPagamentoCollection: ITipoPagamento[] = [sampleWithRequiredData];
        expectedResult = service.addTipoPagamentoToCollectionIfMissing(tipoPagamentoCollection, undefined, null);
        expect(expectedResult).toEqual(tipoPagamentoCollection);
      });
    });

    describe('compareTipoPagamento', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTipoPagamento(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTipoPagamento(entity1, entity2);
        const compareResult2 = service.compareTipoPagamento(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTipoPagamento(entity1, entity2);
        const compareResult2 = service.compareTipoPagamento(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTipoPagamento(entity1, entity2);
        const compareResult2 = service.compareTipoPagamento(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
