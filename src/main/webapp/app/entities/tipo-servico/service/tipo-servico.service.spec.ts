import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITipoServico } from '../tipo-servico.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../tipo-servico.test-samples';

import { TipoServicoService } from './tipo-servico.service';

const requireRestSample: ITipoServico = {
  ...sampleWithRequiredData,
};

describe('TipoServico Service', () => {
  let service: TipoServicoService;
  let httpMock: HttpTestingController;
  let expectedResult: ITipoServico | ITipoServico[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TipoServicoService);
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

    it('should create a TipoServico', () => {
      const tipoServico = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(tipoServico).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TipoServico', () => {
      const tipoServico = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(tipoServico).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TipoServico', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TipoServico', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TipoServico', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTipoServicoToCollectionIfMissing', () => {
      it('should add a TipoServico to an empty array', () => {
        const tipoServico: ITipoServico = sampleWithRequiredData;
        expectedResult = service.addTipoServicoToCollectionIfMissing([], tipoServico);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tipoServico);
      });

      it('should not add a TipoServico to an array that contains it', () => {
        const tipoServico: ITipoServico = sampleWithRequiredData;
        const tipoServicoCollection: ITipoServico[] = [
          {
            ...tipoServico,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTipoServicoToCollectionIfMissing(tipoServicoCollection, tipoServico);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TipoServico to an array that doesn't contain it", () => {
        const tipoServico: ITipoServico = sampleWithRequiredData;
        const tipoServicoCollection: ITipoServico[] = [sampleWithPartialData];
        expectedResult = service.addTipoServicoToCollectionIfMissing(tipoServicoCollection, tipoServico);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tipoServico);
      });

      it('should add only unique TipoServico to an array', () => {
        const tipoServicoArray: ITipoServico[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const tipoServicoCollection: ITipoServico[] = [sampleWithRequiredData];
        expectedResult = service.addTipoServicoToCollectionIfMissing(tipoServicoCollection, ...tipoServicoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const tipoServico: ITipoServico = sampleWithRequiredData;
        const tipoServico2: ITipoServico = sampleWithPartialData;
        expectedResult = service.addTipoServicoToCollectionIfMissing([], tipoServico, tipoServico2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tipoServico);
        expect(expectedResult).toContain(tipoServico2);
      });

      it('should accept null and undefined values', () => {
        const tipoServico: ITipoServico = sampleWithRequiredData;
        expectedResult = service.addTipoServicoToCollectionIfMissing([], null, tipoServico, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tipoServico);
      });

      it('should return initial array if no TipoServico is added', () => {
        const tipoServicoCollection: ITipoServico[] = [sampleWithRequiredData];
        expectedResult = service.addTipoServicoToCollectionIfMissing(tipoServicoCollection, undefined, null);
        expect(expectedResult).toEqual(tipoServicoCollection);
      });
    });

    describe('compareTipoServico', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTipoServico(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTipoServico(entity1, entity2);
        const compareResult2 = service.compareTipoServico(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTipoServico(entity1, entity2);
        const compareResult2 = service.compareTipoServico(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTipoServico(entity1, entity2);
        const compareResult2 = service.compareTipoServico(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
