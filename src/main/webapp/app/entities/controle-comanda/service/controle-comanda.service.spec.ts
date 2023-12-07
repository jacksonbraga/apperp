import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IControleComanda } from '../controle-comanda.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../controle-comanda.test-samples';

import { ControleComandaService, RestControleComanda } from './controle-comanda.service';

const requireRestSample: RestControleComanda = {
  ...sampleWithRequiredData,
  data: sampleWithRequiredData.data?.format(DATE_FORMAT),
};

describe('ControleComanda Service', () => {
  let service: ControleComandaService;
  let httpMock: HttpTestingController;
  let expectedResult: IControleComanda | IControleComanda[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ControleComandaService);
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

    it('should create a ControleComanda', () => {
      const controleComanda = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(controleComanda).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ControleComanda', () => {
      const controleComanda = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(controleComanda).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ControleComanda', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ControleComanda', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ControleComanda', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addControleComandaToCollectionIfMissing', () => {
      it('should add a ControleComanda to an empty array', () => {
        const controleComanda: IControleComanda = sampleWithRequiredData;
        expectedResult = service.addControleComandaToCollectionIfMissing([], controleComanda);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(controleComanda);
      });

      it('should not add a ControleComanda to an array that contains it', () => {
        const controleComanda: IControleComanda = sampleWithRequiredData;
        const controleComandaCollection: IControleComanda[] = [
          {
            ...controleComanda,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addControleComandaToCollectionIfMissing(controleComandaCollection, controleComanda);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ControleComanda to an array that doesn't contain it", () => {
        const controleComanda: IControleComanda = sampleWithRequiredData;
        const controleComandaCollection: IControleComanda[] = [sampleWithPartialData];
        expectedResult = service.addControleComandaToCollectionIfMissing(controleComandaCollection, controleComanda);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(controleComanda);
      });

      it('should add only unique ControleComanda to an array', () => {
        const controleComandaArray: IControleComanda[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const controleComandaCollection: IControleComanda[] = [sampleWithRequiredData];
        expectedResult = service.addControleComandaToCollectionIfMissing(controleComandaCollection, ...controleComandaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const controleComanda: IControleComanda = sampleWithRequiredData;
        const controleComanda2: IControleComanda = sampleWithPartialData;
        expectedResult = service.addControleComandaToCollectionIfMissing([], controleComanda, controleComanda2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(controleComanda);
        expect(expectedResult).toContain(controleComanda2);
      });

      it('should accept null and undefined values', () => {
        const controleComanda: IControleComanda = sampleWithRequiredData;
        expectedResult = service.addControleComandaToCollectionIfMissing([], null, controleComanda, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(controleComanda);
      });

      it('should return initial array if no ControleComanda is added', () => {
        const controleComandaCollection: IControleComanda[] = [sampleWithRequiredData];
        expectedResult = service.addControleComandaToCollectionIfMissing(controleComandaCollection, undefined, null);
        expect(expectedResult).toEqual(controleComandaCollection);
      });
    });

    describe('compareControleComanda', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareControleComanda(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareControleComanda(entity1, entity2);
        const compareResult2 = service.compareControleComanda(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareControleComanda(entity1, entity2);
        const compareResult2 = service.compareControleComanda(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareControleComanda(entity1, entity2);
        const compareResult2 = service.compareControleComanda(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
