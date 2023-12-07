import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISituacao } from '../situacao.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../situacao.test-samples';

import { SituacaoService } from './situacao.service';

const requireRestSample: ISituacao = {
  ...sampleWithRequiredData,
};

describe('Situacao Service', () => {
  let service: SituacaoService;
  let httpMock: HttpTestingController;
  let expectedResult: ISituacao | ISituacao[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SituacaoService);
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

    it('should create a Situacao', () => {
      const situacao = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(situacao).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Situacao', () => {
      const situacao = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(situacao).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Situacao', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Situacao', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Situacao', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSituacaoToCollectionIfMissing', () => {
      it('should add a Situacao to an empty array', () => {
        const situacao: ISituacao = sampleWithRequiredData;
        expectedResult = service.addSituacaoToCollectionIfMissing([], situacao);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(situacao);
      });

      it('should not add a Situacao to an array that contains it', () => {
        const situacao: ISituacao = sampleWithRequiredData;
        const situacaoCollection: ISituacao[] = [
          {
            ...situacao,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSituacaoToCollectionIfMissing(situacaoCollection, situacao);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Situacao to an array that doesn't contain it", () => {
        const situacao: ISituacao = sampleWithRequiredData;
        const situacaoCollection: ISituacao[] = [sampleWithPartialData];
        expectedResult = service.addSituacaoToCollectionIfMissing(situacaoCollection, situacao);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(situacao);
      });

      it('should add only unique Situacao to an array', () => {
        const situacaoArray: ISituacao[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const situacaoCollection: ISituacao[] = [sampleWithRequiredData];
        expectedResult = service.addSituacaoToCollectionIfMissing(situacaoCollection, ...situacaoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const situacao: ISituacao = sampleWithRequiredData;
        const situacao2: ISituacao = sampleWithPartialData;
        expectedResult = service.addSituacaoToCollectionIfMissing([], situacao, situacao2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(situacao);
        expect(expectedResult).toContain(situacao2);
      });

      it('should accept null and undefined values', () => {
        const situacao: ISituacao = sampleWithRequiredData;
        expectedResult = service.addSituacaoToCollectionIfMissing([], null, situacao, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(situacao);
      });

      it('should return initial array if no Situacao is added', () => {
        const situacaoCollection: ISituacao[] = [sampleWithRequiredData];
        expectedResult = service.addSituacaoToCollectionIfMissing(situacaoCollection, undefined, null);
        expect(expectedResult).toEqual(situacaoCollection);
      });
    });

    describe('compareSituacao', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSituacao(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSituacao(entity1, entity2);
        const compareResult2 = service.compareSituacao(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSituacao(entity1, entity2);
        const compareResult2 = service.compareSituacao(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSituacao(entity1, entity2);
        const compareResult2 = service.compareSituacao(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
