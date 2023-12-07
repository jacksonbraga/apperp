import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IGrupoServico } from '../grupo-servico.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../grupo-servico.test-samples';

import { GrupoServicoService } from './grupo-servico.service';

const requireRestSample: IGrupoServico = {
  ...sampleWithRequiredData,
};

describe('GrupoServico Service', () => {
  let service: GrupoServicoService;
  let httpMock: HttpTestingController;
  let expectedResult: IGrupoServico | IGrupoServico[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(GrupoServicoService);
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

    it('should create a GrupoServico', () => {
      const grupoServico = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(grupoServico).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a GrupoServico', () => {
      const grupoServico = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(grupoServico).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a GrupoServico', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of GrupoServico', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a GrupoServico', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addGrupoServicoToCollectionIfMissing', () => {
      it('should add a GrupoServico to an empty array', () => {
        const grupoServico: IGrupoServico = sampleWithRequiredData;
        expectedResult = service.addGrupoServicoToCollectionIfMissing([], grupoServico);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(grupoServico);
      });

      it('should not add a GrupoServico to an array that contains it', () => {
        const grupoServico: IGrupoServico = sampleWithRequiredData;
        const grupoServicoCollection: IGrupoServico[] = [
          {
            ...grupoServico,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addGrupoServicoToCollectionIfMissing(grupoServicoCollection, grupoServico);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a GrupoServico to an array that doesn't contain it", () => {
        const grupoServico: IGrupoServico = sampleWithRequiredData;
        const grupoServicoCollection: IGrupoServico[] = [sampleWithPartialData];
        expectedResult = service.addGrupoServicoToCollectionIfMissing(grupoServicoCollection, grupoServico);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(grupoServico);
      });

      it('should add only unique GrupoServico to an array', () => {
        const grupoServicoArray: IGrupoServico[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const grupoServicoCollection: IGrupoServico[] = [sampleWithRequiredData];
        expectedResult = service.addGrupoServicoToCollectionIfMissing(grupoServicoCollection, ...grupoServicoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const grupoServico: IGrupoServico = sampleWithRequiredData;
        const grupoServico2: IGrupoServico = sampleWithPartialData;
        expectedResult = service.addGrupoServicoToCollectionIfMissing([], grupoServico, grupoServico2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(grupoServico);
        expect(expectedResult).toContain(grupoServico2);
      });

      it('should accept null and undefined values', () => {
        const grupoServico: IGrupoServico = sampleWithRequiredData;
        expectedResult = service.addGrupoServicoToCollectionIfMissing([], null, grupoServico, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(grupoServico);
      });

      it('should return initial array if no GrupoServico is added', () => {
        const grupoServicoCollection: IGrupoServico[] = [sampleWithRequiredData];
        expectedResult = service.addGrupoServicoToCollectionIfMissing(grupoServicoCollection, undefined, null);
        expect(expectedResult).toEqual(grupoServicoCollection);
      });
    });

    describe('compareGrupoServico', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareGrupoServico(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareGrupoServico(entity1, entity2);
        const compareResult2 = service.compareGrupoServico(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareGrupoServico(entity1, entity2);
        const compareResult2 = service.compareGrupoServico(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareGrupoServico(entity1, entity2);
        const compareResult2 = service.compareGrupoServico(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
